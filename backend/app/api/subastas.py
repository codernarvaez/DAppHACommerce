from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from app.models.schemas import SubastaCreate, SubastaRead, OfertaCreate, OfertaRead
from app.core.database import prisma  # <-- NUEVO: Importamos Prisma
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
        
        nueva_subasta = await prisma.subasta.create(data=subasta_data)
        
        return nueva_subasta
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/", response_model=List[SubastaRead])
async def listar_subastas():
    try:
        subastas = await prisma.subasta.find_many()
        return subastas
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.post("/{subasta_id}/ofertas", response_model=OfertaRead, status_code=status.HTTP_201_CREATED)
async def registrar_oferta(subasta_id: str, oferta: OfertaCreate, usuario_actual: dict = SoloCompradores):
    try:
        oferta_data = oferta.model_dump(mode='json')
        oferta_data["subasta_id"] = subasta_id 
        
        nueva_oferta = await prisma.oferta.create(data=oferta_data)
        
        if nueva_oferta:
            nuevo_precio = oferta_data["monto"]
            await prisma.subasta.update(
                where={"id": subasta_id},
                data={"precio_actual": nuevo_precio}
            )
            
        return nueva_oferta
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/{subasta_id}/ofertas", response_model=List[OfertaRead])
async def listar_ofertas_subasta(subasta_id: str):
    try:
        ofertas = await prisma.oferta.find_many(
            where={"subasta_id": subasta_id}
        )
        return ofertas
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))