from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.database import prisma
from app.core.security import requerir_roles
from app.models.schemas import LoteCreate, LoteRead, LoteUpdate

router = APIRouter(
    prefix="/api/lotes",
    tags=["Lotes y Trazabilidad (Simulador Web3)"]
)

GestionLotes = Depends(requerir_roles(["administrador", "productor"]))


@router.get("/", response_model=List[LoteRead])
async def listar_lotes():
    """
    Obtiene el listado de lotes.
    """
    try:
        #lotes = await BlockchainService.obtener_lotes_onchain()
        lotes = await prisma.lote.find_many()
        return lotes
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            #detail="Error al leer los lotes desde la blockchain."
            detail="Error al leer los lotes desde la base de datos."
        )

@router.get("/{lote_id}", response_model=LoteRead)
async def obtener_lote(lote_id: UUID):
    """
    Obtiene la información de un lote específico desde la base de datos.
    """
    try:
        #lote = await BlockchainService.obtener_lote_onchain(lote_id)
        lote = await prisma.lote.find_unique(where={"id": str(lote_id)})
        
        if not lote:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, 
                #detail="Lote no encontrado en el registro descentralizado."
                detail="Lote no encontrado."
            )
            
        return lote
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            detail="Error al procesar la lectura del lote."
        )


@router.post("/", response_model=LoteRead, status_code=status.HTTP_201_CREATED)
async def crear_lote(lote: LoteCreate, usuario_actual: dict = GestionLotes):
    try:
        lote_creado = await prisma.lote.create(data=lote.model_dump(mode="json"))
        return lote_creado
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.put("/{lote_id}", response_model=LoteRead)
async def actualizar_lote(lote_id: UUID, lote: LoteUpdate, usuario_actual: dict = GestionLotes):
    try:
        lote_existente = await prisma.lote.find_unique(where={"id": str(lote_id)})
        if not lote_existente:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lote no encontrado.")

        datos_actualizados = lote.model_dump(mode="json", exclude_unset=True)
        lote_actualizado = await prisma.lote.update(
            where={"id": str(lote_id)},
            data=datos_actualizados,
        )
        return lote_actualizado
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.delete("/{lote_id}")
async def eliminar_lote(lote_id: UUID, usuario_actual: dict = GestionLotes):
    try:
        lote_existente = await prisma.lote.find_unique(where={"id": str(lote_id)})
        if not lote_existente:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lote no encontrado.")

        await prisma.lote.delete(where={"id": str(lote_id)})
        return {"message": "Lote eliminado correctamente."}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
