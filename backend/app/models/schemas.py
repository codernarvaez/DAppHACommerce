from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal
from enum import Enum
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class RolUsuario(str, Enum):
    comprador = "comprador"
    productor = "productor"
    administrador = "administrador"


class EstadoLote(str, Enum):
    registrado = "registrado"
    verificado = "verificado"
    publicado = "publicado"


class EstadoProducto(str, Enum):
    borrador = "borrador"
    publicado = "publicado"
    agotado = "agotado"
    inactivo = "inactivo"


class EstadoSubasta(str, Enum):
    programada = "programada"
    activa = "activa"
    finalizada = "finalizada"
    cancelada = "cancelada"


class EstadoOrden(str, Enum):
    pendiente = "pendiente"
    pagada = "pagada"
    cancelada = "cancelada"
    completada = "completada"


class UsuarioBase(BaseModel):
    email: str = Field(min_length=5, max_length=254)
    nombre_completo: str = Field(min_length=2, max_length=200)
    rol: RolUsuario


class UsuarioCreate(UsuarioBase):
    pass


class UsuarioRead(UsuarioBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class ProductorBase(BaseModel):
    usuario_id: UUID
    nombre_finca: str = Field(min_length=2, max_length=200)
    region: str = Field(min_length=2, max_length=120)
    altitud_msnm: Decimal = Field(ge=0)
    certificaciones: str = Field(default="")
    wallet_address: str = Field(min_length=20, max_length=64)


class ProductorCreate(ProductorBase):
    pass


class ProductorRead(ProductorBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class LoteBase(BaseModel):
    productor_id: UUID
    codigo_lote: str = Field(min_length=2, max_length=80)
    variedad: str = Field(min_length=2, max_length=120)
    fecha_cosecha: date
    peso_kg: Decimal = Field(gt=0)
    proceso: str = Field(min_length=2, max_length=120)
    origen_geo: str = Field(min_length=2, max_length=255)
    sha256_hash: str = Field(min_length=64, max_length=64)
    polygon_tx_hash: str = Field(default="")
    estado: EstadoLote


class LoteCreate(LoteBase):
    pass


class LoteRead(LoteBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class ProductoBase(BaseModel):
    lote_id: UUID
    nombre: str = Field(min_length=2, max_length=200)
    descripcion: str = Field(default="")
    precio_base: Decimal = Field(gt=0)
    stock_disponible: int = Field(ge=0)
    estado: EstadoProducto


class ProductoCreate(ProductoBase):
    pass


class ProductoRead(ProductoBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class SubastaBase(BaseModel):
    producto_id: UUID
    productor_id: UUID
    precio_inicial: Decimal = Field(gt=0)
    precio_actual: Decimal = Field(gt=0)
    fecha_inicio: datetime
    fecha_fin: datetime
    estado: EstadoSubasta
    contrato_address: str = Field(min_length=20, max_length=64)


class SubastaCreate(SubastaBase):
    pass


class SubastaRead(SubastaBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class OfertaBase(BaseModel):
    subasta_id: UUID
    comprador_id: UUID
    monto: Decimal = Field(gt=0)
    tx_hash: str = Field(min_length=1, max_length=128)


class OfertaCreate(OfertaBase):
    pass


class OfertaRead(OfertaBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class OrdenBase(BaseModel):
    comprador_id: UUID
    producto_id: UUID
    subasta_id: UUID | None = None
    total: Decimal = Field(gt=0)
    estado: EstadoOrden
    metodo_pago: str = Field(min_length=2, max_length=80)
    tx_hash: str = Field(default="")


class OrdenCreate(OrdenBase):
    pass


class OrdenRead(OrdenBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class QRTokensBase(BaseModel):
    lote_id: UUID
    token_hash: str = Field(min_length=1, max_length=128)
    url_publica: str = Field(min_length=1, max_length=255)


class QRTokensCreate(QRTokensBase):
    pass


class QRTokensRead(QRTokensBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
