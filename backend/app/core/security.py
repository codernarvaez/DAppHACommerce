from typing import Any

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.database import prisma, supabase_client

security = HTTPBearer()


def _normalizar_email(email: str | None) -> str | None:
    if not email:
        return None
    return email.strip().lower()


async def _sincronizar_cuenta_supabase(supabase_user: Any):
    email = _normalizar_email(getattr(supabase_user, "email", None))
    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="La cuenta autenticada no expone un correo electrónico válido."
        )

    app_metadata = getattr(supabase_user, "app_metadata", None) or {}
    provider = app_metadata.get("provider") or "google"
    provider_id = getattr(supabase_user, "id", None)

    cuenta = None
    if provider_id:
        cuenta = await prisma.cuenta.find_unique(where={"proveedor_auth_id": provider_id})

    if cuenta is None:
        cuenta = await prisma.cuenta.find_unique(where={"email": email})

    cuenta_data = {
        "email": email,
        "clave": None,
        "proveedor_auth": provider,
        "proveedor_auth_id": provider_id,
    }

    if cuenta is None:
        return await prisma.cuenta.create(data=cuenta_data)

    await prisma.cuenta.update(
        where={"id": cuenta.id},
        data={
            "email": email,
            "proveedor_auth": provider,
            "proveedor_auth_id": provider_id,
        },
    )

    return await prisma.cuenta.find_unique(where={"id": cuenta.id})


async def obtener_identidad_autenticada(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verifica el JWT de Supabase y asegura que exista la cuenta local asociada.
    """
    token = credentials.credentials
    try:
        user_response = supabase_client.auth.get_user(token)
        if not user_response or not user_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido o expirado."   
            )

        cuenta = await _sincronizar_cuenta_supabase(user_response.user)
        usuario = await prisma.usuario.find_first(where={"cuenta_id": cuenta.id})

        app_metadata = getattr(user_response.user, "app_metadata", None) or {}

        return {
            "cuenta": cuenta,
            "usuario": usuario,
            "provider": app_metadata.get("provider") or "google",
            "email": _normalizar_email(getattr(user_response.user, "email", None)),
        }

    except HTTPException:
        raise
    except Exception as e:
        print("ERROR EN LA AUTENTICACIÓN:", e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Error de autenticación. Verifica tus credenciales."
        )


async def obtener_usuario_actual(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verifica el token JWT de Supabase y recupera el perfil local del usuario.
    """
    identidad = await obtener_identidad_autenticada(credentials)
    usuario = identidad["usuario"]

    if not usuario:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="La cuenta autenticada no tiene un perfil local registrado en el sistema."
        )

    return usuario.model_dump(mode="json")


def requerir_roles(roles_permitidos: list[str]):
    """
    Fábrica de dependencias para proteger rutas 
    Bloquea el acceso si el rol del usuario no está en la lista permitida.
    """
    def validador_roles(usuario: dict = Depends(obtener_usuario_actual)):
        if usuario.get("rol") not in roles_permitidos:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Acceso denegado. Se requiere uno de los siguientes roles: {', '.join(roles_permitidos)}"
            )
        return usuario
    return validador_roles
