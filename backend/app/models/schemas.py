from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal
from enum import Enum
from typing import Any
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class RolUsuario(str, Enum):
    comprador = "comprador"
    productor = "productor"
    administrador = "administrador"
    empleado = "empleado"


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


# --- CUENTAS Y PERFILES ---

class CuentaBase(BaseModel):
    email: EmailStr = Field(description="Correo electrónico único del usuario")
    clave: str | None = Field(
        default=None,
        max_length=255,
        description="Contraseña local en hash; puede ser nula cuando la cuenta entra por OAuth"
    )
    proveedor_auth: str = Field(
        default="local",
        max_length=50,
        description="Proveedor de autenticación asociado a la cuenta"
    )
    proveedor_auth_id: str | None = Field(
        default=None,
        max_length=255,
        description="Identificador de usuario en el proveedor externo"
    )


class CuentaCreate(CuentaBase):
    pass


class CuentaRead(CuentaBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    created_at: datetime


class GoogleOAuthPerfilCreate(BaseModel):
    nombres: str = Field(min_length=2, max_length=100,
                         description="Nombres del usuario")
    apellidos: str = Field(min_length=2, max_length=100,
                           description="Apellidos del usuario")
    telefono: str = Field(min_length=7, max_length=20,
                          description="Teléfono de contacto")
    rol: RolUsuario = Field(
        default=RolUsuario.comprador,
        description="Rol inicial para la cuenta autenticada con Google"
    )
    wallet_address: str | None = Field(
        default=None,
        description="Billetera Web3 en Polygon (opcional)"
    )


class GoogleOAuthSyncRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    cuenta: CuentaRead
    usuario: UsuarioRead | None = None
    provider: str
    email: EmailStr
    perfil_pendiente: bool = False
    mensaje: str


class UsuarioBase(BaseModel):
    cuenta_id: UUID = Field(description="Referencia a la cuenta del usuario")
    nombres: str = Field(min_length=2, max_length=100,
                         description="Nombres del usuario")
    apellidos: str = Field(min_length=2, max_length=100,
                           description="Apellidos del usuario")
    rol: RolUsuario = Field(description="Rol del usuario en el sistema")
    telefono: str = Field(min_length=7, max_length=20,
                          description="Teléfono de contacto")
    wallet_address: str | None = Field(
        default=None, description="Billetera Web3 en Polygon (ej. MetaMask)")


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


class EmpleadoBase(BaseModel):
    usuario_id: UUID = Field(description="Referencia al usuario")
    cargo: str = Field(min_length=2, max_length=100,
                       description="Cargo interno (ej: Cajero, Bodeguero)")
    turno: str = Field(
        default="mañana", description="Turno de trabajo asignado")
    activo: bool = Field(default=True, description="Estado del empleado")


class EmpleadoCreate(EmpleadoBase):
    pass


class EmpleadoRead(EmpleadoBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    created_at: datetime


# --- INVENTARIO, PRODUCTOS Y TRAZABILIDAD ---

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
    id_trazabilidad_externa: str = Field(
        default="", description="ID del sistema externo de trazabilidad")
    datos_trazabilidad: dict[str, Any] = Field(
        default_factory=dict, description="Datos adicionales de trazabilidad (JSON)")
    tx_hash: str | None = Field(
        default=None, description="Hash de transacción en Polygon")


class LoteRead(LoteBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    created_at: datetime


class LoteCreate(LoteBase):
    pass


class LoteUpdate(BaseModel):
    productor_id: UUID | None = None
    codigo_lote: str | None = Field(default=None, min_length=2, max_length=80)
    variedad: str | None = Field(default=None, min_length=2, max_length=120)
    fecha_cosecha: date | None = None
    peso_kg: Decimal | None = Field(default=None, gt=0)
    proceso: str | None = Field(default=None, min_length=2, max_length=120)
    origen_geo: str | None = Field(default=None, min_length=2, max_length=255)
    estado: EstadoLote | None = None
    id_trazabilidad_externa: str | None = None
    datos_trazabilidad: dict[str, Any] | None = None
    tx_hash: str | None = None


class EventoTrazabilidadBase(BaseModel):
    lote_id: UUID = Field(description="Referencia al lote")
    nombre_evento: str = Field(description="Ej: Cosecha, Fermentación, Secado")
    fecha_evento: datetime = Field(description="Fecha exacta del suceso")
    responsable: str = Field(
        description="Entidad o persona encargada de la etapa")
    detalles: dict[str, Any] = Field(
        default_factory=dict, description="Variables como humedad, temperatura, etc.")


class EventoTrazabilidadCreate(EventoTrazabilidadBase):
    pass


class EventoTrazabilidadRead(EventoTrazabilidadBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    created_at: datetime


class ProductoBase(BaseModel):
    lote_id: UUID = Field(description="Referencia al lote")
    nombre: str = Field(min_length=2, max_length=200,
                        description="Nombre del producto")
    descripcion: str = Field(default="", description="Descripción detallada")
    categoria: str = Field(
        description="Categoría del producto (Ej: Café, Cacao)")
    imagenes: list[str] = Field(
        default_factory=list, description="Lista de URLs de imágenes")
    precio_base: Decimal = Field(gt=0, description="Precio base del producto")
    stock_disponible: int = Field(
        ge=0, description="Cantidad disponible en stock")
    estado: EstadoProducto = Field(description="Estado actual del producto")
    tx_hash: str | None = Field(
        default=None, description="Hash de la transacción en la blockchain")


class ProductoRead(ProductoBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    created_at: datetime


class ProductoCreate(ProductoBase):
    pass


class ProductoUpdate(BaseModel):
    lote_id: UUID | None = None
    nombre: str | None = Field(default=None, min_length=2, max_length=200)
    descripcion: str | None = None
    categoria: str | None = Field(default=None, min_length=1, max_length=100)
    imagenes: list[str] | None = None
    precio_base: Decimal | None = Field(default=None, gt=0)
    stock_disponible: int | None = Field(default=None, ge=0)
    estado: EstadoProducto | None = None
    tx_hash: str | None = None

# --- E-COMMERCE, SUBASTAS Y PUNTO DE VENTA (POS) ---


class SubastaBase(BaseModel):
    producto_id: UUID = Field(description="Referencia al producto")
    productor_id: UUID = Field(description="Referencia al productor")
    precio_inicial: Decimal = Field(
        gt=0, description="Precio inicial de la subasta")
    precio_actual: Decimal = Field(gt=0, description="Precio actual más alto")
    fecha_inicio: datetime = Field(description="Fecha y hora de inicio")
    fecha_fin: datetime = Field(description="Fecha y hora de finalización")
    estado: EstadoSubasta = Field(description="Estado actual de la subasta")


class SubastaRead(SubastaBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    created_at: datetime


class OfertaBase(BaseModel):
    subasta_id: UUID = Field(description="Referencia a la subasta")
    comprador_id: UUID = Field(description="Referencia al comprador")
    monto: Decimal = Field(gt=0, description="Monto ofrecido")
    tx_hash: str | None = Field(
        default=None, description="Firma o Hash en Web3 si aplica")


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
    direccion_envio: str = Field(description="Dirección de despacho")
    tracking_logistica: str | None = Field(
        default=None, description="Guía de envío de paquetería")


class OrdenCreate(OrdenBase):
    pass


class OrdenRead(OrdenBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    created_at: datetime


class VentaPOSBase(BaseModel):
    empleado_id: UUID = Field(
        description="Referencia al empleado que realizó la venta")
    producto_id: UUID = Field(description="Referencia al producto vendido")
    cantidad: int = Field(gt=0, description="Cantidad despachada")
    total: Decimal = Field(gt=0, description="Monto total cobrado en el local")
    metodo_pago: str = Field(description="Efectivo, Tarjeta, etc.")


class VentaPOSCreate(VentaPOSBase):
    pass


class VentaPOSRead(VentaPOSBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    created_at: datetime


# --- REGISTROS TÉCNICOS ---

class TransaccionWeb3Base(BaseModel):
    referencia_id: UUID = Field(description="ID del lote o subasta")
    tipo_operacion: str = Field(
        description="Ej: registro_lote, liquidar_subasta")
    tx_hash: str = Field(description="Hash de la transacción")
    costo_gas: Decimal = Field(description="Costo del gas consumido en MATIC")
    estado_red: str = Field(default="confirmada")


class TransaccionWeb3Create(TransaccionWeb3Base):
    pass


class TransaccionWeb3Read(TransaccionWeb3Base):
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
