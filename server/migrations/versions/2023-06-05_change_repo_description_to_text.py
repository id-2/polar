"""change repo description to text

Revision ID: 98a7aacb7809
Revises: eb00a572b25b
Create Date: 2023-06-05 15:34:04.699530

"""
from alembic import op
import sqlalchemy as sa


# Polar Custom Imports
from polar.kit.extensions.sqlalchemy import PostgresUUID

# revision identifiers, used by Alembic.
revision = "98a7aacb7809"
down_revision = "eb00a572b25b"
branch_labels: tuple[str] | None = None
depends_on: tuple[str] | None = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "repositories",
        "description",
        existing_type=sa.VARCHAR(length=256),
        type_=sa.Text(),
        existing_nullable=True,
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column(
        "repositories",
        "description",
        existing_type=sa.Text(),
        type_=sa.VARCHAR(length=256),
        existing_nullable=True,
    )
    # ### end Alembic commands ###