from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from app.models.schemas import VentaPOSCreate, VentaPOSRead
from app.core.database import prisma  
from app.core.security import requerir_roles

router = APIRouter(
    prefix="/api/pos",
    tags=["Punto de Venta (POS)"]
)

SoloPersonalPOS = Depends(requerir_roles(["empleado", "administrador"]))

@router.post("/", response_model=VentaPOSRead, status_code=status.HTTP_201_CREATED)
async def registrar_venta_pos(venta: VentaPOSCreate, usuario_actual: dict = SoloPersonalPOS):
    try:
        venta_data = venta.model_dump(mode='json')
        
        nueva_venta = await prisma.ventapos.create(data=venta_data)
        
        if not nueva_venta:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error al procesar la venta.")
            
        producto_id = venta_data["producto_id"]
        cantidad_vendida = venta_data["cantidad"]
        
        producto_actual = await prisma.producto.find_unique(where={"id": producto_id})
        
        if producto_actual:
            nuevo_stock = producto_actual.stock_disponible - cantidad_vendida
            await prisma.producto.update(
                where={"id": producto_id},
                data={"stock_disponible": nuevo_stock}
            )

        return nueva_venta
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/", response_model=List[VentaPOSRead])
async def historial_ventas_pos(usuario_actual: dict = SoloPersonalPOS):
    try:
        ventas = await prisma.ventapos.find_many()
        return ventas
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))