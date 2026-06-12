from fastapi import APIRouter, HTTPException, status
from app.models.schemas import ProductoCreate, ProductoRead
from app.core.database import supabase_client

router = APIRouter(
    prefix="/api/productos",
    tags=["Productos y Catálogo"]
)

@router.post("/", response_model=ProductoRead, status_code=status.HTTP_201_CREATED)
async def registrar_producto(producto: ProductoCreate):
    try:
        # mode='json' serializa UUID y Decimal automáticamente
        producto_data = producto.model_dump(mode='json') 
        
        response = supabase_client.table("productos").insert(producto_data).execute()

        if not response.data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No se pudo registrar el producto.")
            
        return response.data[0]
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/", response_model=list[ProductoRead])
async def listar_productos():
    try:
        response = supabase_client.table("productos").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))