import os
from pathlib import Path

from dotenv import load_dotenv
from supabase import Client, create_client
from prisma import Prisma

_BACKEND_ROOT = Path(__file__).resolve().parents[2]

for env_path in (_BACKEND_ROOT / ".env", _BACKEND_ROOT / "app" / ".env"):
    if env_path.is_file():
        load_dotenv(env_path, override=False)


def _require_env(name: str) -> str:
    value = os.getenv(name)
    if not value:
        raise RuntimeError(f"Variable de entorno requerida no configurada: {name}")
    return value


def _get_supabase_key() -> str:
    for name in ("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_KEY", "SUPABASE_ANON_KEY"):
        value = os.getenv(name)
        if value:
            return value
    raise RuntimeError(
        "Configura SUPABASE_SERVICE_ROLE_KEY, SUPABASE_KEY o SUPABASE_ANON_KEY en el archivo .env"
    )


supabase_client: Client = create_client(
    _require_env("SUPABASE_URL"),
    _get_supabase_key(),
)

prisma = Prisma()