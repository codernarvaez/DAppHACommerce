from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from app.models.schemas import UsuarioCreate, UsuarioRead
from app.core.database import prisma  
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
        
        nuevo_usuario = await prisma.usuario.create(data=usuario_data)

        if not nuevo_usuario:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error al registrar perfil.")
            
        return nuevo_usuario
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.get("/", response_model=List[UsuarioRead])
async def listar_usuarios(usuario_actual: dict = PersonalInterno):
    try:
        usuarios = await prisma.usuario.find_many()
        return usuarios
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.get("/{usuario_id}", response_model=UsuarioRead)
async def obtener_usuario(usuario_id: str, usuario_actual: dict = UsuarioAutenticado):
    try:
        usuario = await prisma.usuario.find_unique(where={"id": usuario_id})
        
        if not usuario:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado.")
            
        return usuario
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))