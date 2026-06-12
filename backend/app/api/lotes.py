from fastapi import APIRouter, HTTPException, status
from app.models.schemas import LoteCreate, LoteRead
from app.core.utils import generar_hash_lote
from app.core.database import supabase_client

router = APIRouter(
    prefix="/api/lotes",
    tags=["Lotes y Trazabilidad"]
)

@router.post("/", response_model=LoteRead, status_code=status.HTTP_201_CREATED)
async def registrar_lote(lote: LoteCreate):
    """
    Registra un nuevo lote de producción, calcula su Hash SHA-256 
    para la trazabilidad en Polygon y lo almacena en Supabase.
    """
    try:
        lote_data = lote.model_dump()
        
        lote_data["productor_id"] = str(lote_data["productor_id"])
        lote_data["fecha_cosecha"] = lote_data["fecha_cosecha"].isoformat()
        lote_data["peso_kg"] = float(lote_data["peso_kg"]) 
        
        lote_hash = generar_hash_lote(lote_data)
        lote_data["tx_hash"] = lote_hash 

        response = supabase_client.table("lotes").insert(lote_data).execute()

        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, 
                detail="No se pudo crear el lote en la base de datos."
            )
            
        lote_guardado = response.data[0]
        
        return lote_guardado

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error interno al registrar el lote: {str(e)}"
        )