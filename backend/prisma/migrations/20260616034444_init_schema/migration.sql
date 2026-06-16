-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('comprador', 'productor', 'administrador', 'empleado');

-- CreateEnum
CREATE TYPE "EstadoLote" AS ENUM ('registrado', 'verificado', 'publicado');

-- CreateEnum
CREATE TYPE "EstadoProducto" AS ENUM ('borrador', 'publicado', 'agotado', 'inactivo');

-- CreateEnum
CREATE TYPE "EstadoSubasta" AS ENUM ('programada', 'activa', 'finalizada', 'cancelada');

-- CreateEnum
CREATE TYPE "EstadoOrden" AS ENUM ('pendiente', 'pagada', 'cancelada', 'completada');

-- CreateTable
CREATE TABLE "cuentas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "clave" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cuentas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cuenta_id" UUID NOT NULL,
    "nombres" VARCHAR(100) NOT NULL,
    "apellidos" VARCHAR(100) NOT NULL,
    "rol" "RolUsuario" NOT NULL,
    "telefono" VARCHAR(20) NOT NULL,
    "wallet_address" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productores" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID NOT NULL,
    "nombre_finca" VARCHAR(200) NOT NULL,
    "region" VARCHAR(120) NOT NULL,
    "altitud_msnm" INTEGER NOT NULL,
    "certificaciones" TEXT DEFAULT '',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "empleados" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "usuario_id" UUID NOT NULL,
    "cargo" VARCHAR(100) NOT NULL,
    "turno" VARCHAR(50) NOT NULL DEFAULT 'mañana',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "empleados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lotes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "productor_id" UUID NOT NULL,
    "codigo_lote" VARCHAR(80) NOT NULL,
    "variedad" VARCHAR(120) NOT NULL,
    "fecha_cosecha" DATE NOT NULL,
    "peso_kg" DECIMAL(10,2) NOT NULL,
    "proceso" VARCHAR(120) NOT NULL,
    "origen_geo" VARCHAR(255) NOT NULL,
    "estado" "EstadoLote" NOT NULL DEFAULT 'registrado',
    "id_trazabilidad_externa" TEXT NOT NULL DEFAULT '',
    "datos_trazabilidad" JSONB NOT NULL DEFAULT '{}',
    "tx_hash" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lotes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "eventos_trazabilidad" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lote_id" UUID NOT NULL,
    "nombre_evento" VARCHAR(150) NOT NULL,
    "fecha_evento" TIMESTAMPTZ NOT NULL,
    "responsable" VARCHAR(150) NOT NULL,
    "detalles" JSONB NOT NULL DEFAULT '{}',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "eventos_trazabilidad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lote_id" UUID NOT NULL,
    "nombre" VARCHAR(200) NOT NULL,
    "descripcion" TEXT DEFAULT '',
    "categoria" VARCHAR(100) NOT NULL,
    "imagenes" TEXT[],
    "precio_base" DECIMAL(12,2) NOT NULL,
    "stock_disponible" INTEGER NOT NULL,
    "estado" "EstadoProducto" NOT NULL DEFAULT 'borrador',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subastas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "producto_id" UUID NOT NULL,
    "productor_id" UUID NOT NULL,
    "precio_inicial" DECIMAL(12,2) NOT NULL,
    "precio_actual" DECIMAL(12,2) NOT NULL,
    "fecha_inicio" TIMESTAMPTZ NOT NULL,
    "fecha_fin" TIMESTAMPTZ NOT NULL,
    "estado" "EstadoSubasta" NOT NULL DEFAULT 'programada',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subastas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ofertas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "subasta_id" UUID NOT NULL,
    "comprador_id" UUID NOT NULL,
    "monto" DECIMAL(12,2) NOT NULL,
    "tx_hash" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ofertas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordenes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "comprador_id" UUID NOT NULL,
    "producto_id" UUID NOT NULL,
    "subasta_id" UUID,
    "total" DECIMAL(12,2) NOT NULL,
    "estado" "EstadoOrden" NOT NULL DEFAULT 'pendiente',
    "metodo_pago" VARCHAR(80) NOT NULL,
    "direccion_envio" VARCHAR(255) NOT NULL,
    "tracking_logistica" VARCHAR(255),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ordenes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ventas_pos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "empleado_id" UUID NOT NULL,
    "producto_id" UUID NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "total" DECIMAL(12,2) NOT NULL,
    "metodo_pago" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ventas_pos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transacciones_web3" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "referencia_id" UUID NOT NULL,
    "tipo_operacion" VARCHAR(100) NOT NULL,
    "tx_hash" VARCHAR(255) NOT NULL,
    "costo_gas" DECIMAL(18,8) NOT NULL,
    "estado_red" VARCHAR(50) NOT NULL DEFAULT 'confirmada',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transacciones_web3_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qr_tokens" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lote_id" UUID NOT NULL,
    "url_publica" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "qr_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cuentas_email_key" ON "cuentas"("email");

-- CreateIndex
CREATE UNIQUE INDEX "lotes_codigo_lote_key" ON "lotes"("codigo_lote");

-- CreateIndex
CREATE UNIQUE INDEX "transacciones_web3_tx_hash_key" ON "transacciones_web3"("tx_hash");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_cuenta_id_fkey" FOREIGN KEY ("cuenta_id") REFERENCES "cuentas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productores" ADD CONSTRAINT "productores_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "empleados" ADD CONSTRAINT "empleados_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lotes" ADD CONSTRAINT "lotes_productor_id_fkey" FOREIGN KEY ("productor_id") REFERENCES "productores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "eventos_trazabilidad" ADD CONSTRAINT "eventos_trazabilidad_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subastas" ADD CONSTRAINT "subastas_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "subastas" ADD CONSTRAINT "subastas_productor_id_fkey" FOREIGN KEY ("productor_id") REFERENCES "productores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ofertas" ADD CONSTRAINT "ofertas_subasta_id_fkey" FOREIGN KEY ("subasta_id") REFERENCES "subastas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ofertas" ADD CONSTRAINT "ofertas_comprador_id_fkey" FOREIGN KEY ("comprador_id") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_comprador_id_fkey" FOREIGN KEY ("comprador_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordenes" ADD CONSTRAINT "ordenes_subasta_id_fkey" FOREIGN KEY ("subasta_id") REFERENCES "subastas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas_pos" ADD CONSTRAINT "ventas_pos_empleado_id_fkey" FOREIGN KEY ("empleado_id") REFERENCES "empleados"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ventas_pos" ADD CONSTRAINT "ventas_pos_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qr_tokens" ADD CONSTRAINT "qr_tokens_lote_id_fkey" FOREIGN KEY ("lote_id") REFERENCES "lotes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
