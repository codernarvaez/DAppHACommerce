from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from app.models.schemas import SubastaCreate, SubastaRead, OfertaCreate, OfertaRead
from app.core.database import supabase_client
from app.core.security import requerir_roles

router = APIRouter(
    prefix="/api/subastas",
    tags=["Subastas Web3"]
)

SoloProductores = Depends(requerir_roles(["productor", "administrador"]))
SoloCompradores = Depends(requerir_roles(["comprador", "administrador"]))

@router.post("/", response_model=SubastaRead, status_code=status.HTTP_201_CREATED)
async def crear_subasta(subasta: SubastaCreate, usuario_actual: dict = SoloProductores):

    try:
        subasta_data = subasta.model_dump(mode='json')
        response = supabase_client.table("subastas").insert(subasta_data).execute()

        if not response.data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error al crear la subasta.")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/", response_model=List[SubastaRead])
async def listar_subastas():

    try:
        response = supabase_client.table("subastas").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/{subasta_id}/ofertas", response_model=OfertaRead, status_code=status.HTTP_201_CREATED)
async def registrar_oferta(subasta_id: str, oferta: OfertaCreate, usuario_actual: dict = SoloCompradores):

    try:
        oferta_data = oferta.model_dump(mode='json')
        oferta_data["subasta_id"] = subasta_id 
        
        response = supabase_client.table("ofertas").insert(oferta_data).execute()
        
        if response.data:
            nuevo_precio = oferta_data["monto"]
            supabase_client.table("subastas").update({"precio_actual": nuevo_precio}).eq("id", subasta_id).execute()
            
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/{subasta_id}/ofertas", response_model=List[OfertaRead])
async def listar_ofertas_subasta(subasta_id: str):

    try:
        response = supabase_client.table("ofertas").select("*").eq("subasta_id", subasta_id).execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))