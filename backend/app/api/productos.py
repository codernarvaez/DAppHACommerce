from fastapi import APIRouter, HTTPException, status
from typing import List
from app.models.schemas import ProductoCreate, ProductoRead
from app.core.database import supabase_client

router = APIRouter(
    prefix="/api/productos",
    tags=["Productos y Catálogo"]
)

@router.post("/", response_model=ProductoRead, status_code=status.HTTP_201_CREATED)
async def registrar_producto(producto: ProductoCreate):
    try:
        producto_data = producto.model_dump(mode='json')
        response = supabase_client.table("productos").insert(producto_data).execute()

        if not response.data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No se pudo registrar el producto.")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/", response_model=List[ProductoRead])
async def listar_productos():
    try:
        response = supabase_client.table("productos").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/{producto_id}", response_model=ProductoRead)
async def obtener_producto(producto_id: str):
    try:
        response = supabase_client.table("productos").select("*").eq("id", producto_id).execute()
        if not response.data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado.")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.patch("/{producto_id}", response_model=ProductoRead)
async def actualizar_estado_producto(producto_id: str, estado: str):
    """Actualiza rápidamente el estado de un producto (ej. de 'borrador' a 'publicado' o 'agotado')."""
    try:
        response = supabase_client.table("productos").update({"estado": estado}).eq("id", producto_id).execute()
        if not response.data:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado.")
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))