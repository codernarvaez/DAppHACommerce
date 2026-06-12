from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal
from enum import Enum
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field


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


class CuentaBase(BaseModel):
    email: EmailStr = Field(description="Correo electrónico único del usuario")
    clave: str = Field(min_length=8, max_length=255,
                       description="Contraseña encriptada")


class CuentaCreate(CuentaBase):
    pass


class CuentaRead(CuentaBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class UsuarioBase(BaseModel):
    cuenta_id: UUID = Field(description="Referencia a la cuenta del usuario")
    nombre_completo: str = Field(
        min_length=2, max_length=200, description="Nombre completo")
    rol: RolUsuario = Field(description="Rol del usuario en el sistema")


class UsuarioCreate(UsuarioBase):
    pass


class UsuarioRead(UsuarioBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class ProductorBase(BaseModel):
    usuario_id: UUID = Field(description="Referencia al usuario productor")
    nombre_finca: str = Field(
        min_length=2, max_length=200, description="Nombre de la finca")
    region: str = Field(min_length=2, max_length=120,
                        description="Región de ubicación")
    altitud_msnm: int = Field(
        ge=0, description="Altitud en metros sobre el nivel del mar")
    certificaciones: str = Field(
        default="", description="Certificaciones de la finca")


class ProductorCreate(ProductorBase):
    pass


class ProductorRead(ProductorBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class LoteBase(BaseModel):
    productor_id: UUID = Field(description="Referencia al productor")
    codigo_lote: str = Field(min_length=2, max_length=80,
                             description="Código único del lote")
    variedad: str = Field(min_length=2, max_length=120,
                          description="Variedad del producto")
    fecha_cosecha: date = Field(description="Fecha de cosecha")
    peso_kg: Decimal = Field(gt=0, description="Peso total en kilogramos")
    proceso: str = Field(min_length=2, max_length=120,
                         description="Proceso de tratamiento")
    origen_geo: str = Field(min_length=2, max_length=255,
                            description="Origen geográfico")
    estado: EstadoLote = Field(description="Estado actual del lote")


class LoteCreate(LoteBase):
    pass


class LoteRead(LoteBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class ProductoBase(BaseModel):
    lote_id: UUID = Field(description="Referencia al lote")
    nombre: str = Field(min_length=2, max_length=200,
                        description="Nombre del producto")
    descripcion: str = Field(default="", description="Descripción detallada")
    precio_base: Decimal = Field(gt=0, description="Precio base del producto")
    stock_disponible: int = Field(
        ge=0, description="Cantidad disponible en stock")
    estado: EstadoProducto = Field(description="Estado actual del producto")


class ProductoCreate(ProductoBase):
    pass


class ProductoRead(ProductoBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class SubastaBase(BaseModel):
    producto_id: UUID = Field(description="Referencia al producto")
    productor_id: UUID = Field(description="Referencia al productor")
    precio_inicial: Decimal = Field(
        gt=0, description="Precio inicial de la subasta")
    precio_actual: Decimal = Field(gt=0, description="Precio actual más alto")
    fecha_inicio: datetime = Field(description="Fecha y hora de inicio")
    fecha_fin: datetime = Field(description="Fecha y hora de finalización")
    estado: EstadoSubasta = Field(description="Estado actual de la subasta")


class SubastaCreate(SubastaBase):
    pass


class SubastaRead(SubastaBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class OfertaBase(BaseModel):
    subasta_id: UUID = Field(description="Referencia a la subasta")
    comprador_id: UUID = Field(description="Referencia al comprador")
    monto: Decimal = Field(gt=0, description="Monto ofrecido")


class OfertaCreate(OfertaBase):
    pass


class OfertaRead(OfertaBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class OrdenBase(BaseModel):
    comprador_id: UUID = Field(description="Referencia al comprador")
    producto_id: UUID = Field(description="Referencia al producto")
    subasta_id: UUID | None = Field(
        default=None, description="Referencia a subasta si aplica")
    total: Decimal = Field(gt=0, description="Monto total de la orden")
    estado: EstadoOrden = Field(description="Estado actual de la orden")
    metodo_pago: str = Field(min_length=2, max_length=80,
                             description="Método de pago utilizado")


class OrdenCreate(OrdenBase):
    pass


class OrdenRead(OrdenBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime


class QRTokensBase(BaseModel):
    lote_id: UUID = Field(description="Referencia al lote")
    url_publica: str = Field(min_length=1, max_length=255,
                             description="URL pública del QR")


class QRTokensCreate(QRTokensBase):
    pass


class QRTokensRead(QRTokensBase):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    created_at: datetime
