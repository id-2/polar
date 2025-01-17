from fastapi import APIRouter, Depends, Response

from polar.auth.dependencies import Auth, AuthenticatedWithScope, UserRequiredAuth
from polar.auth.service import AuthService, LoginResponse, LogoutResponse
from polar.authz.service import Authz, Scope
from polar.exceptions import InternalServerError, ResourceNotFound, Unauthorized
from polar.integrations.stripe.service import stripe as stripe_service
from polar.postgres import AsyncSession, get_db_session
from polar.user.service import user as user_service

from .schemas import (
    UserRead,
    UserScopes,
    UserSetAccount,
    UserStripePortalSession,
    UserUpdateSettings,
)

router = APIRouter(prefix="/users", tags=["users"])


AuthUserRead = AuthenticatedWithScope(
    required_scopes=[Scope.web_default, Scope.user_read],
    allow_anonymous=False,
    fallback_to_anonymous=False,
)


@router.get("/me", response_model=UserRead)
async def get_authenticated(
    auth: Auth = Depends(AuthUserRead),
    session: AsyncSession = Depends(get_db_session),
) -> UserRead:
    if not auth.user:
        raise Unauthorized()

    # get for return
    user = await user_service.get_loaded(session, auth.user.id)
    return UserRead.from_orm(user)


@router.get("/me/scopes", response_model=UserScopes)
async def scopes(
    auth: Auth = Depends(
        AuthenticatedWithScope(
            # require auth, but don't check scopes
            fallback_to_anonymous=False,
            allow_anonymous=False,
        )
    ),
) -> UserScopes:
    return UserScopes(scopes=[s.value for s in auth.scoped_subject.scopes])


@router.post("/me/token")
async def create_token(auth: UserRequiredAuth) -> LoginResponse:
    return AuthService.generate_login_json_response(user=auth.user)


@router.put("/me", response_model=UserRead)
async def update_preferences(
    settings: UserUpdateSettings,
    auth: UserRequiredAuth,
    session: AsyncSession = Depends(get_db_session),
) -> UserRead:
    user = await user_service.update_preferences(session, auth.user, settings)

    # get for return
    user_loaded = await user_service.get_loaded(session, user.id)
    if not user_loaded:
        raise ResourceNotFound()

    return UserRead.from_orm(user_loaded)


@router.patch("/me/account", response_model=UserRead)
async def set_account(
    set_account: UserSetAccount,
    auth: UserRequiredAuth,
    authz: Authz = Depends(Authz.authz),
    session: AsyncSession = Depends(get_db_session),
) -> UserRead:
    user = await user_service.set_account(
        session, authz=authz, user=auth.user, account_id=set_account.account_id
    )

    # get for return
    user_loaded = await user_service.get_loaded(session, user.id)
    if not user_loaded:
        raise ResourceNotFound()

    return UserRead.from_orm(user_loaded)


@router.get("/logout")
async def logout(
    response: Response,
    auth: UserRequiredAuth,
) -> LogoutResponse:
    return AuthService.generate_logout_response(response=response)


@router.post(
    "/me/stripe_customer_portal",
    response_model=UserStripePortalSession,
)
async def create_stripe_customer_portal(
    auth: UserRequiredAuth,
    session: AsyncSession = Depends(get_db_session),
) -> UserStripePortalSession:
    portal = await stripe_service.create_user_portal_session(session, auth.subject)
    if not portal:
        raise InternalServerError()

    return UserStripePortalSession(url=portal.url)
