from fastapi import APIRouter, Depends, HTTPException, status

from app.core.database import prisma
from app.core.security import obtener_identidad_autenticada
from app.models.schemas import GoogleOAuthPerfilCreate, GoogleOAuthSyncRead, UsuarioRead

router = APIRouter(
    prefix="/api/auth",
    tags=["Autenticación"],
)


@router.get("/google/sync", response_model=GoogleOAuthSyncRead)
async def sincronizar_cuenta_google(identidad: dict = Depends(obtener_identidad_autenticada)):
    cuenta = identidad["cuenta"]
    usuario = identidad["usuario"]

    return {
        "cuenta": cuenta,
        "usuario": usuario,
        "provider": identidad["provider"],
        "email": identidad["email"],
        "perfil_pendiente": usuario is None,
        "mensaje": (
            "La cuenta de Google quedó sincronizada con el backend local."
            if usuario
            else "La cuenta de Google quedó sincronizada, pero falta completar el perfil local."
        ),
    }


@router.post("/google/perfil", response_model=UsuarioRead, status_code=status.HTTP_201_CREATED)
async def completar_perfil_google(
    perfil: GoogleOAuthPerfilCreate,
    identidad: dict = Depends(obtener_identidad_autenticada),
):
    cuenta = identidad["cuenta"]
    usuario_existente = identidad["usuario"]

    if usuario_existente:
        return usuario_existente

    try:
        usuario_creado = await prisma.usuario.create(
            data={
                **perfil.model_dump(mode="json"),
                "cuenta_id": cuenta.id,
            }
        )
        return usuario_creado
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e),
        )
