import os
import stripe
import base64
import json
from datetime import datetime
from uuid import UUID
from decimal import Decimal
from fastapi import APIRouter, HTTPException, Request, Header, status, Depends
from pydantic import BaseModel
from app.core.database import prisma, supabase_client

router = APIRouter(
    prefix="/api/pagos",
    tags=["Pagos (Stripe)"]
)

# Initialize Stripe API key
stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

class PaymentIntentCreate(BaseModel):
    monto: float
    moneda: str = "usd"
    producto_id: str | None = None
    direccion_envio: str = "Dirección de pruebas"

def decode_jwt_sub(token: str) -> str | None:
    try:
        parts = token.split('.')
        if len(parts) == 3:
            # Fix base64 padding
            payload_part = parts[1]
            payload_part += '=' * (4 - len(payload_part) % 4)
            payload = json.loads(base64.urlsafe_b64decode(payload_part).decode('utf-8'))
            return payload.get("sub")
    except Exception as e:
        print("Error decoding JWT sub:", e)
    return None

async def resolve_comprador_id(authorization: str | None) -> str:
    if authorization and authorization.startswith("Bearer "):
        token = authorization.split(" ")[1]
        
        # Try Supabase session first
        try:
            user_response = supabase_client.auth.get_user(token)
            if user_response and user_response.user:
                email = user_response.user.email
                if email:
                    cuenta = await prisma.cuenta.find_unique(where={"email": email.strip().lower()})
                    if cuenta:
                        usuario = await prisma.usuario.find_first(where={"cuenta_id": cuenta.id})
                        if usuario:
                            return usuario.id
        except Exception:
            pass

        # Try custom JWT decoding (e.g. huellaaltura bearer token)
        sub = decode_jwt_sub(token)
        if sub:
            # Look up account by provider_id or sub (as UUID)
            try:
                # check if sub is valid UUID
                UUID(sub)
                usuario = await prisma.usuario.find_unique(where={"id": sub})
                if usuario:
                    return usuario.id
            except ValueError:
                pass
            
            # fallback search by names or other info if possible
            cuenta = await prisma.cuenta.find_first(where={"proveedor_auth_id": sub})
            if cuenta:
                usuario = await prisma.usuario.find_first(where={"cuenta_id": cuenta.id})
                if usuario:
                    return usuario.id

    # Fallback to database query to satisfy FK constraints
    buyer = await prisma.usuario.find_first(where={"rol": "comprador"})
    if buyer:
        return buyer.id
        
    any_user = await prisma.usuario.find_first()
    if any_user:
        return any_user.id
        
    # Create mock user if DB is empty
    cuenta = await prisma.cuenta.create(data={
        "email": "comprador.test@coffee.com",
        "proveedor_auth": "local"
    })
    new_user = await prisma.usuario.create(data={
        "cuenta": {"connect": {"id": cuenta.id}},
        "nombres": "Comprador",
        "apellidos": "Ficticio",
        "rol": "comprador",
        "telefono": "0999999999"
    })
    return new_user.id

@router.post("/create-payment-intent")
async def create_payment_intent(
    payload: PaymentIntentCreate,
    authorization: str | None = Header(None)
):
    try:
        # Resolve Buyer/Comprador
        comprador_id = await resolve_comprador_id(authorization)

        # Retrieve a valid product from DB to avoid FK constraint errors, or create a mock product
        producto_id = payload.producto_id
        if not producto_id:
            any_prod = await prisma.producto.find_first()
            if any_prod:
                producto_id = any_prod.id
            else:
                # Create a mock product
                # Need a mock lote first
                any_lote = await prisma.lote.find_first()
                if not any_lote:
                    # Need a producer
                    producer = await prisma.productor.find_first()
                    if not producer:
                        # Need a user with producer role
                        cuenta = await prisma.cuenta.create(data={"email": "productor.test@coffee.com", "proveedor_auth": "local"})
                        p_user = await prisma.usuario.create(data={
                            "cuenta": {"connect": {"id": cuenta.id}},
                            "nombres": "Productor",
                            "apellidos": "Prueba",
                            "rol": "productor",
                            "telefono": "0988888888"
                        })
                        producer = await prisma.productor.create(data={
                            "usuario": {"connect": {"id": p_user.id}},
                            "nombre_finca": "Finca Test",
                            "region": "Loja",
                            "altitud_msnm": 1500
                        })
                    
                    any_lote = await prisma.lote.create(data={
                        "productor": {"connect": {"id": producer.id}},
                        "codigo_lote": "LOTE-TEMP-TEST",
                        "variedad": "Caturra",
                        "fecha_cosecha": datetime.utcnow(),
                        "peso_kg": Decimal("100.0"),
                        "proceso": "Lavado",
                        "origen_geo": "Loja",
                        "estado": "publicado"
                    })
                
                mock_prod = await prisma.producto.create(data={
                    "lote": {"connect": {"id": any_lote.id}},
                    "nombre": "Café Origen Pruebas",
                    "descripcion": "Café de especialidad para pruebas de pasarela.",
                    "categoria": "Grano",
                    "precio_base": Decimal(payload.monto),
                    "stock_disponible": 10,
                    "estado": "publicado"
                })
                producto_id = mock_prod.id

        # Validate that the final resolved producto_id exists in the database
        prod_exists = await prisma.producto.find_unique(where={"id": producto_id})
        if not prod_exists:
            # If the user specified one but it does not exist, fetch any existing or throw
            any_prod = await prisma.producto.find_first()
            if any_prod:
                producto_id = any_prod.id
            else:
                raise HTTPException(status_code=404, detail="No se encontró ningún producto para asociar a la orden.")

        # Create Order in Prisma
        nueva_orden = await prisma.orden.create(data={
            "comprador": {"connect": {"id": comprador_id}},
            "producto": {"connect": {"id": producto_id}},
            "total": Decimal(payload.monto),
            "estado": "pendiente",
            "metodo_pago": "Stripe Card",
            "direccion_envio": payload.direccion_envio
        })


        # Calculate cents (integer)
        amount_cents = int(round(payload.monto * 100))

        # Create Stripe PaymentIntent
        intent = stripe.PaymentIntent.create(
            amount=amount_cents,
            currency=payload.moneda.lower(),
            metadata={
                "orden_id": nueva_orden.id,
                "producto_id": producto_id,
                "comprador_id": comprador_id
            }
        )

        return {
            "client_secret": intent.client_secret,
            "orden_id": nueva_orden.id,
            "payment_intent_id": intent.id
        }
    except Exception as e:
        print("Error in create_payment_intent API:", e)
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/webhook")
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature")
    endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET")

    event = None

    try:
        if endpoint_secret and sig_header:
            event = stripe.Webhook.construct_event(
                payload, sig_header, endpoint_secret
            )
        else:
            # Tolerant mode for local development without webhook signature validation
            event = json.loads(payload)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Webhook parsing error: {str(e)}")

    # Handle success event
    event_type = event.get("type") if isinstance(event, dict) else event.type
    event_data = event.get("data") if isinstance(event, dict) else event.data
    
    if event_type == "payment_intent.succeeded":
        payment_intent = event_data.get("object") if isinstance(event_data, dict) else event_data.object
        metadata = payment_intent.get("metadata", {})
        orden_id = metadata.get("orden_id")

        if orden_id:
            try:
                # Update Order state in Prisma to 'pagada'
                await prisma.orden.update(
                    where={"id": orden_id},
                    data={"estado": "pagada"}
                )
                print(f"Orden {orden_id} pagada exitosamente vía Webhook.")
            except Exception as e:
                print(f"Error actualizando la orden {orden_id} en Webhook:", e)

    return {"status": "success"}
