# ☕ CoffeeTrace Market: E-Commerce & Subastas con Trazabilidad Blockchain

¡Bienvenido a **CoffeeTrace Market**! Una plataforma de comercio electrónico y subastas descentralizadas que conecta directamente a productores de café de especialidad con compradores globales. 

Este sistema implementa la norma **ISO 22005** para garantizar la trazabilidad del origen del grano, utilizando la blockchain de **Polygon (MATIC)** como notaría digital inmutable para asegurar que cada lote comercializado o subastado es auténtico.

---

## 🚀 Arquitectura y Stack Tecnológico

La plataforma utiliza una arquitectura moderna de alto rendimiento ("Web 2.5"), separando la velocidad del comercio electrónico tradicional de la seguridad criptográfica de la blockchain:

* **Frontend (Astro):** Arquitectura basada en islas de rendimiento óptimo y Server-Side Rendering (SSR) para las páginas de los productos, subastas activas y la landing de trazabilidad del consumidor final (acceso rápido vía QR).
* **Backend (FastAPI):** Microservicios asíncronos en Python para la lógica de negocio, autenticación, procesamiento de ofertas en tiempo real y comunicación con el nodo de Polygon.
* **Base de Datos y Autenticación:** Robusto para almacenar el catálogo, perfiles de productores, ofertas de subastas y persistencia de datos pesados (imágenes, certificados).
* **Capa Blockchain:** Contratos inteligentes desplegados para registrar los hashes de trazabilidad (ISO 22005) y gestionar la lógica tranIsparente de las subastas.
* **Movil App** Controla la venta o pedidos por medio de la APP para garantizar al accebilidad.
---

## 🗺️ Mapa de Arquitectura del Sistema

El siguiente diagrama ilustra cómo interactúan los componentes del stack para procesar una compra directa o una puja en subasta, validando los datos contra la blockchain:

---

## 🎯 Hitos de Desarrollo (Milestones)

El proyecto se divide en 4 fases incrementales para asegurar un desarrollo controlado:

### 📍 Hito 1: Infraestructura Base e ISO 22005 (Back & DB)
* [ ] Diseño del esquema relacional en Supabase (Tablas: `usuarios`, `productores`, `lotes`, `productos`, `subastas`).
* [ ] Endpoints en FastAPI para el registro técnico del café por parte del productor.
* [ ] Desarrollo del algoritmo de hasheo SHA-256 para empaquetar la ficha técnica del lote.

### 📍 Hito 2: Contratos Inteligentes y Capa de Confianza (Blockchain)
* [ ] Creación del Smart Contract `TrazabilidadCafe.sol` (Registro inmutable del hash del lote).
* [ ] Creación del Smart Contract `SubastaCafe.sol` (Gestión transparente de pujas, tiempos de finalización y liberación de fondos).
* [ ] Despliegue en la red de pruebas **Polygon Amoy Testnet** y scripts de conexión en FastAPI usando `web3.py`.

### 📍 Hito 3: Portal E-Commerce y Motor de Subastas (Frontend)
* [ ] Interfaz de catálogo y pasarela de compra directa en Astro.
* [ ] Componentes reactivos para subastas en tiempo real (relojes en cuenta regresiva y actualización de ofertas).
* [ ] Módulo de generación de códigos QR para el empaquetado físico del café.

### 📍 Hito 4: Portal del Consumidor y Pruebas de Integración
* [ ] Pantalla pública de trazabilidad optimizada para dispositivos móviles (lo que ve el cliente al escanear el QR).
* [ ] Lógica de validación cruzada: `Hash(Supabase) == Hash(Polygon)`.
* [ ] Pruebas de estrés y auditoría de costos de gas en Polygon.

---

## 📂 Estructura del Repositorio

```text
├── blockchain/          # Proyecto de Smart Contracts
│   ├── contracts/       # Contratos en Solidity (.sol)
│   ├── scripts/         # Scripts de despliegue en Polygon Amoy
│   └── test/            # Pruebas unitarias de los contratos
├── backend/             # Microservicio de API (FastAPI)
│   ├── app/
│   │   ├── api/         # Endpoints (productos, subastas, blockchain)
│   │   ├── core/        # Configuración web3 y seguridad
│   │   └── models/      # Esquemas de Pydantic
│   ├── main.py
│   └── requirements.txt
├── frontend/            # Aplicación Web (Astro)
│   ├── src/
│   │   ├── components/  # Islas interactivos (Pujas de subastas)
│   │   ├── layouts/
│   │   └── pages/       # Vistas (e-commerce, /trazabilidad/[id])
│   ├── astro.config.mjs
│   └── package.json
└── README.md
