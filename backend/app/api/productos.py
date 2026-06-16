from fastapi import APIRouter, HTTPException, status, Depends
from typing import List
from app.models.schemas import ProductoCreate, ProductoRead, ProductoUpdate
from app.core.database import prisma  # <-- NUEVO: Importamos Prisma
from app.core.security import obtener_usuario_actual, requerir_roles

router = APIRouter(
    prefix="/api/productos",
    tags=["Productos y Catálogo"]
)

UsuarioAutenticado = Depends(obtener_usuario_actual)
SoloProductores = Depends(requerir_roles(["productor", "administrador"]))

@router.post("/", response_model=ProductoRead, status_code=status.HTTP_201_CREATED)
async def crear_producto(producto: ProductoCreate, usuario_actual: dict = SoloProductores):
    try:
        producto_data = producto.model_dump(mode='json')
        
        nuevo_producto = await prisma.producto.create(data=producto_data)
            
        return nuevo_producto
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/", response_model=List[ProductoRead])
async def listar_productos():
    try:
        productos = await prisma.producto.find_many()
        return productos
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.get("/{producto_id}", response_model=ProductoRead)
async def obtener_producto(producto_id: str):
    try:
        producto = await prisma.producto.find_unique(where={"id": producto_id})
        
        if not producto:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado.")
            
        return producto
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))

@router.patch("/{producto_id}", response_model=ProductoRead)
async def actualizar_producto(producto_id: str, producto_actualizado: ProductoUpdate, usuario_actual: dict = SoloProductores):
    try:
        update_data = producto_actualizado.model_dump(exclude_unset=True, mode='json')
        
        if not update_data:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No hay datos para actualizar.")

        producto_existente = await prisma.producto.find_unique(where={"id": producto_id})
        if not producto_existente:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado o no se pudo actualizar.")

        producto = await prisma.producto.update(
            where={"id": producto_id},
            data=update_data
        )
            
        return producto
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))