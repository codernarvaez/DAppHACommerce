-- Permite cuentas creadas por OAuth externo como Google

ALTER TABLE "cuentas"
    ALTER COLUMN "clave" DROP NOT NULL;

ALTER TABLE "cuentas"
    ADD COLUMN IF NOT EXISTS "proveedor_auth" VARCHAR(50) NOT NULL DEFAULT 'local';

ALTER TABLE "cuentas"
    ADD COLUMN IF NOT EXISTS "proveedor_auth_id" VARCHAR(255);

CREATE UNIQUE INDEX IF NOT EXISTS "cuentas_proveedor_auth_id_key"
    ON "cuentas"("proveedor_auth_id");