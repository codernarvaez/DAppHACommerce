from typing import List
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.database import prisma
from app.core.security import requerir_roles
from app.models.schemas import ProductoCreate, ProductoRead, ProductoUpdate

router = APIRouter(
    prefix="/api/productos",
    tags=["Productos y Catálogo"]
)

GestionProductos = Depends(requerir_roles(["administrador", "productor"]))

@router.get("/", response_model=List[ProductoRead])
async def listar_productos():
    """
    Obtiene el catálogo de productos
    """
    try:
        #productos = await BlockchainService.obtener_catalogo_onchain()
        productos = await prisma.producto.find_many()
        return productos
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            #detail="Error al conectar con el nodo RPC de la blockchain."
            detail="Error al leer los productos desde la base de datos."
        )

@router.get("/{producto_id}", response_model=ProductoRead)
async def obtener_producto(producto_id: UUID):
    """
    Busca los detalles de un producto específico.
    """
    try:
        #producto = await BlockchainService.obtener_producto_onchain(producto_id)
        producto = await prisma.producto.find_unique(where={"id": str(producto_id)})
        
        if not producto:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                #detail="El producto solicitado no existe en el registro descentralizado."
                detail="El producto solicitado no existe."
            )
            
        return producto
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            #detail="Error al procesar la lectura del contrato inteligente."
            detail="Error al procesar la lectura del producto."
        )


@router.post("/", response_model=ProductoRead, status_code=status.HTTP_201_CREATED)
async def crear_producto(producto: ProductoCreate, usuario_actual: dict = GestionProductos):
    try:
        producto_creado = await prisma.producto.create(data=producto.model_dump(mode="json"))
        return producto_creado
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.put("/{producto_id}", response_model=ProductoRead)
async def actualizar_producto(producto_id: UUID, producto: ProductoUpdate, usuario_actual: dict = GestionProductos):
    try:
        producto_existente = await prisma.producto.find_unique(where={"id": str(producto_id)})
        if not producto_existente:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado.")

        datos_actualizados = producto.model_dump(mode="json", exclude_unset=True)
        producto_actualizado = await prisma.producto.update(
            where={"id": str(producto_id)},
            data=datos_actualizados,
        )
        return producto_actualizado
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.delete("/{producto_id}")
async def eliminar_producto(producto_id: UUID, usuario_actual: dict = GestionProductos):
    try:
        producto_existente = await prisma.producto.find_unique(where={"id": str(producto_id)})
        if not producto_existente:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Producto no encontrado.")

        await prisma.producto.delete(where={"id": str(producto_id)})
        return {"message": "Producto eliminado correctamente."}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
        

