from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from app.models.schemas import UsuarioCreate, UsuarioRead
from app.core.database import supabase_client
from app.core.security import obtener_usuario_actual, requerir_roles

router = APIRouter(
    prefix="/api/usuarios",
    tags=["Gestión de Usuarios y Roles"]
)

SoloAdministradores = Depends(requerir_roles(["administrador"]))
PersonalInterno = Depends(requerir_roles(["administrador", "empleado"]))
UsuarioAutenticado = Depends(obtener_usuario_actual)


@router.post("/", response_model=UsuarioRead, status_code=status.HTTP_201_CREATED)
async def registrar_usuario(usuario: UsuarioCreate, usuario_actual: dict = SoloAdministradores):
    try:
        usuario_data = usuario.model_dump(mode='json')
        response = supabase_client.table("usuarios").insert(usuario_data).execute()

        if not response.data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error al registrar perfil.")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.get("/", response_model=List[UsuarioRead])
async def listar_usuarios(usuario_actual: dict = PersonalInterno):
    try:
        response = supabase_client.table("usuarios").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.get("/{usuario_id}", response_model=UsuarioRead)
async def obtener_usuario(usuario_id: str, usuario_actual: dict = UsuarioAutenticado):
    try:
        response = supabase_client.table("usuarios").select("*").eq("id", usuario_id).execute()
        if not response.data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado.")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))