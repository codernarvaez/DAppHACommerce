from fastapi import APIRouter, HTTPException, status
from typing import List
from uuid import UUID
from app.models.schemas import LoteRead 
from app.services.blockchain import BlockchainService

router = APIRouter(
    prefix="/api/lotes",
    tags=["Lotes y Trazabilidad (Simulador Web3)"]
)


@router.get("/", response_model=List[LoteRead])
async def listar_lotes():
    """
    Obtiene el listado de lotes trazados consultando el registro on-chain.
    """
    try:
        lotes = await BlockchainService.obtener_lotes_onchain()
        return lotes
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Error al leer los lotes desde la blockchain."
        )

@router.get("/{lote_id}", response_model=LoteRead)
async def obtener_lote(lote_id: UUID):
    """
    Obtiene la información de trazabilidad de un lote específico desde el Smart Contract.
    """
    try:
        lote = await BlockchainService.obtener_lote_onchain(lote_id)
        
        if not lote:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, 
                detail="Lote no encontrado en el registro descentralizado."
            )
            
        return lote
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Error al procesar la lectura del lote."
        )