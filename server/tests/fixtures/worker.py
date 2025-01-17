import contextlib
from collections.abc import AsyncIterator
from typing import cast
from unittest.mock import MagicMock

import pytest
from arq import ArqRedis
from pytest_mock import MockerFixture

from polar.kit.db.postgres import AsyncEngine, AsyncSession, async_sessionmaker
from polar.kit.utils import utc_now
from polar.worker import JobContext, PolarWorkerContext


@pytest.fixture
def job_context(engine: AsyncEngine, session: AsyncSession) -> JobContext:
    @contextlib.asynccontextmanager
    async def sessionmaker() -> AsyncIterator[AsyncSession]:
        yield session

    return {
        "redis": ArqRedis(),
        "engine": engine,
        "sessionmaker": cast(async_sessionmaker[AsyncSession], sessionmaker),
        "job_id": "fake_job_id",
        "job_try": 1,
        "enqueue_time": utc_now(),
        "score": 0,
    }


@pytest.fixture
def polar_worker_context() -> PolarWorkerContext:
    return PolarWorkerContext()


@pytest.fixture(autouse=True)
def mock_enqueue_job(mocker: MockerFixture) -> MagicMock:
    return mocker.patch("polar.worker._enqueue_job")
