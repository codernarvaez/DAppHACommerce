from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from app.models.schemas import LoteCreate, LoteRead, LoteUpdate 
from app.core.utils import generar_hash_lote
from app.core.database import supabase_client
from app.core.security import obtener_usuario_actual, requerir_roles

router = APIRouter(
    prefix="/api/lotes",
    tags=["Lotes y Trazabilidad"]
)


UsuarioAutenticado = Depends(obtener_usuario_actual)
SoloProductores = Depends(requerir_roles(["productor", "administrador"]))


@router.post("/", response_model=LoteRead, status_code=status.HTTP_201_CREATED)
async def registrar_lote(lote: LoteCreate, usuario_actual: dict = SoloProductores):
    try:
        lote_data = lote.model_dump(mode='json')
        lote_hash = generar_hash_lote(lote_data)
        lote_data["tx_hash"] = lote_hash 

        response = supabase_client.table("lotes").insert(lote_data).execute()

        if not response.data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No se pudo crear el lote.")
            
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.get("/", response_model=List[LoteRead])
async def listar_lotes(usuario_actual: dict = UsuarioAutenticado):
    try:
        response = supabase_client.table("lotes").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.get("/{lote_id}", response_model=LoteRead)
async def obtener_lote(lote_id: str, usuario_actual: dict = UsuarioAutenticado):
    try:
        response = supabase_client.table("lotes").select("*").eq("id", lote_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lote no encontrado.")
            
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.patch("/{lote_id}", response_model=LoteRead)
async def actualizar_lote(lote_id: str, lote_actualizado: LoteUpdate, usuario_actual: dict = SoloProductores):
    try:
        update_data = lote_actualizado.model_dump(exclude_unset=True, mode='json')
        
        if not update_data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No hay datos para actualizar.")

        response = supabase_client.table("lotes").update(update_data).eq("id", lote_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lote no encontrado o no se pudo actualizar.")
            
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))