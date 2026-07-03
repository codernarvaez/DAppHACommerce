from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.core.database import prisma

from app.api import auth, lotes, productos, pos, subastas, usuarios


@asynccontextmanager
async def lifespan(app: FastAPI):
    await prisma.connect()
    yield
    await prisma.disconnect()

app = FastAPI(
    title="API DAppHACommerce / STGC",
    description="Backend principal con trazabilidad y gestión.",
    version="1.0.0",
    lifespan=lifespan
)

# Configuración básica de CORS (Cors ajustado para desarrollo, revisar en producción)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Registrar todas las rutas
app.include_router(lotes.router)
app.include_router(productos.router)
app.include_router(pos.router)
app.include_router(subastas.router)
app.include_router(usuarios.router)
app.include_router(auth.router)


@app.get("/", tags=["Health Check"])
def read_root():
    return {"status": "ok", "message": "API Backend operando correctamente"}
