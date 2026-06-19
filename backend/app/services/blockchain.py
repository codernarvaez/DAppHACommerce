import asyncio
from datetime import datetime
from typing import List, Optional
from uuid import UUID

class BlockchainService:
    @staticmethod
    async def obtener_catalogo_onchain() -> List[dict]:
        await asyncio.sleep(0.3)
        
        return [
            {
                "id": "550e8400-e29b-41d4-a716-446655440000",
                "lote_id": "111e8400-e29b-41d4-a716-446655440000",
                "nombre": "Café Arábica - Cosecha Especial",
                "descripcion": "Lote trazado en blockchain. Notas a chocolate amargo y frutos rojos.",
                "categoria": "Especialidad",
                "imagenes": ["https://picsum.photos/seed/cafe1/800/600"],
                "precio_base": 18.50,
                "stock_disponible": 50,
                "estado": "publicado",
                "created_at": datetime.now(),
                "tx_hash": "0x4a5b6c7d8e9f0123456789abcdef0123456789abcdef0123456789abcdef0123"
            },
            {
                "id": "660e8400-e29b-41d4-a716-446655440001",
                "lote_id": "222e8400-e29b-41d4-a716-446655440001",
                "nombre": "Café Robusta - Altura Premium",
                "descripcion": "Cuerpo denso con acidez baja. Trazabilidad completa desde la finca.",
                "categoria": "Premium",
                "imagenes": ["https://picsum.photos/seed/cafe2/800/600"],
                "precio_base": 15.00,
                "stock_disponible": 120,
                "estado": "publicado",
                "created_at": datetime.now(),
                "tx_hash": "0x9f8e7d6c5b4a3f2e1d0c9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e"
            }
        ]

    @staticmethod
    async def obtener_producto_onchain(producto_id: UUID) -> Optional[dict]:
        catalogo = await BlockchainService.obtener_catalogo_onchain()
        id_str = str(producto_id)
        for producto in catalogo:
            if producto["id"] == id_str:
                return producto
        return None
    

    @staticmethod
    async def obtener_subastas_onchain() -> List[dict]:
        await asyncio.sleep(0.3)
        return [
            {
                "id": "770e8400-e29b-41d4-a716-446655440002",
                "producto_id": "550e8400-e29b-41d4-a716-446655440000",
                "productor_id": "999e8400-e29b-41d4-a716-446655440000",
                "precio_inicial": 20.00,
                "precio_actual": 25.50,
                "fecha_inicio": datetime.now(),
                "fecha_fin": datetime.now(),
                "estado": "activa",
                "created_at": datetime.now()
            }
        ]

    @staticmethod
    async def obtener_ofertas_onchain(subasta_id: UUID) -> List[dict]:
        await asyncio.sleep(0.2)
        return [
            {
                "id": "880e8400-e29b-41d4-a716-446655440003",
                "subasta_id": str(subasta_id),
                "comprador_id": "444e8400-e29b-41d4-a716-446655440000",
                "monto": 25.50,
                "tx_hash": "0xabc123def456abc123def456abc123def456abc123def456abc123def456abcd",
                "created_at": datetime.now()
            }
        ]
    
    @staticmethod
    async def obtener_lotes_onchain() -> List[dict]:
        await asyncio.sleep(0.3) 
        return [
            {
                "id": "111e8400-e29b-41d4-a716-446655440000",
                "productor_id": "999e8400-e29b-41d4-a716-446655440000",
                "codigo_lote": "LOTE-CAFE-2026-001",
                "variedad": "Geisha",
                "fecha_cosecha": datetime.now().date(),
                "peso_kg": 250.50,
                "proceso": "Lavado",
                "origen_geo": "Loja, Ecuador",
                "estado": "publicado",
                "id_trazabilidad_externa": "TRZ-001",
                "datos_trazabilidad": {"humedad": "11%", "temperatura_fermentacion": "22C"},
                "tx_hash": "0x123abc456def7890123abc456def7890123abc456def7890123abc456def7890",
                "created_at": datetime.now()
            }
        ]

    @staticmethod
    async def obtener_lote_onchain(lote_id: UUID) -> Optional[dict]:
        lotes = await BlockchainService.obtener_lotes_onchain()
        id_str = str(lote_id)
        for lote in lotes:
            if lote["id"] == id_str:
                return lote
        return None