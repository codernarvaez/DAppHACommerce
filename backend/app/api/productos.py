from fastapi import APIRouter, HTTPException, status
from typing import List
from uuid import UUID
from app.models.schemas import ProductoRead
from app.services.blockchain import BlockchainService

router = APIRouter(
    prefix="/api/productos",
    tags=["Productos y Catálogo"]
)

@router.get("/", response_model=List[ProductoRead])
async def listar_productos():
    """
    Obtiene el catálogo de productos consultando el servicio descentralizado on-chain.
    """
    try:
        productos = await BlockchainService.obtener_catalogo_onchain()
        return productos
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al conectar con el nodo RPC de la blockchain."
        )

@router.get("/{producto_id}", response_model=ProductoRead)
async def obtener_producto(producto_id: UUID):
    """
    Busca los detalles de un producto específico directamente en el Smart Contract mediante su ID.
    """
    try:
        producto = await BlockchainService.obtener_producto_onchain(producto_id)
        
        if not producto:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="El producto solicitado no existe en el registro descentralizado."
            )
            
        return producto
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error al procesar la lectura del contrato inteligente."
        )