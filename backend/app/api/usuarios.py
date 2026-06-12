from fastapi import APIRouter, HTTPException, status
from app.models.schemas import UsuarioCreate, UsuarioRead
from app.core.database import supabase_client

router = APIRouter(
    prefix="/api/usuarios",
    tags=["Gestión de Usuarios y Roles"]
)

@router.post("/", response_model=UsuarioRead, status_code=status.HTTP_201_CREATED)
async def registrar_usuario(usuario: UsuarioCreate):
    try:
        usuario_data = usuario.model_dump(mode='json')
        response = supabase_client.table("usuarios").insert(usuario_data).execute()

        if not response.data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error al registrar perfil de usuario.")
            
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))