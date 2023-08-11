from uuid import UUID

from sqlalchemy import BigInteger, ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from polar.kit.db.models import RecordModel
from polar.kit.extensions.sqlalchemy import PostgresUUID
from polar.models.organization import Organization
from polar.models.user import User


# TODO: rename? issue_splits? issue_rewards?
class PledgeSplit(RecordModel):
    __tablename__ = "pledge_splits"

    __table_args__ = (
        UniqueConstraint("issue_id", "github_username"),
        UniqueConstraint("issue_id", "organization_id"),
        UniqueConstraint("issue_id", "user_id"),
    )

    issue_id: Mapped[UUID] = mapped_column(
        PostgresUUID, ForeignKey("issues.id"), nullable=False
    )

    share: Mapped[int] = mapped_column(BigInteger, nullable=False)

    github_username: Mapped[str] = mapped_column(String, nullable=True)

    organization_id: Mapped[UUID] = mapped_column(
        PostgresUUID, ForeignKey("organizations.id"), nullable=True
    )

    user_id: Mapped[UUID] = mapped_column(
        PostgresUUID, ForeignKey("users.id"), nullable=True
    )

    organization: Mapped[Organization] = relationship(
        "Organization", foreign_keys=[organization_id], lazy="raise"
    )

    user: Mapped[User] = relationship("User", foreign_keys=[user_id], lazy="raise")