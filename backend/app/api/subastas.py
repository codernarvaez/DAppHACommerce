from fastapi import APIRouter, HTTPException, status
from typing import List
from uuid import UUID
from app.models.schemas import SubastaRead, OfertaRead
from app.services.blockchain import BlockchainService

router = APIRouter(
    prefix="/api/subastas",
    tags=["Subastas Web3 (Simulador)"]
)


@router.get("/", response_model=List[SubastaRead])
async def listar_subastas():
    """
    Obtiene el listado de subastas activas o finalizadas leyendo el Smart Contract.
    """
    try:
        subastas = await BlockchainService.obtener_subastas_onchain()
        return subastas
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Error al leer las subastas desde la blockchain."
        )

@router.get("/{subasta_id}/ofertas", response_model=List[OfertaRead])
async def listar_ofertas_subasta(subasta_id: UUID):
    """
    Lee del contrato inteligente el historial de ofertas (pujas) de una subasta específica.
    """
    try:
        ofertas = await BlockchainService.obtener_ofertas_onchain(subasta_id)
        return ofertas
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Error al leer el historial de ofertas del Smart Contract."
        )