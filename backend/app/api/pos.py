from fastapi import APIRouter, HTTPException, status
from typing import List
from app.models.schemas import VentaPOSCreate, VentaPOSRead
from app.core.database import supabase_client

router = APIRouter(
    prefix="/api/pos",
    tags=["Punto de Venta (POS)"]
)

@router.post("/", response_model=VentaPOSRead, status_code=status.HTTP_201_CREATED)
async def registrar_venta_pos(venta: VentaPOSCreate):
    try:
        venta_data = venta.model_dump(mode='json')
        response_venta = supabase_client.table("ventas_pos").insert(venta_data).execute()
        
        if not response_venta.data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Error al procesar la venta.")
            
        # Descontar el stock automáticamente
        producto_id = venta_data["producto_id"]
        cantidad_vendida = venta_data["cantidad"]
        
        producto_actual = supabase_client.table("productos").select("stock_disponible").eq("id", producto_id).execute()
        if producto_actual.data:
            nuevo_stock = producto_actual.data[0]["stock_disponible"] - cantidad_vendida
            supabase_client.table("productos").update({"stock_disponible": nuevo_stock}).eq("id", producto_id).execute()

        return response_venta.data[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/", response_model=List[VentaPOSRead])
async def historial_ventas_pos():
    try:
        response = supabase_client.table("ventas_pos").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))