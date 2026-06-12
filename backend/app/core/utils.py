import hashlib
import json
from typing import Any

def generar_hash_lote(datos_lote: dict[str, Any]) -> str:
    """
    Toma un diccionario con los datos del lote, los serializa en JSON
    de forma determinista (ordenando las llaves) y genera un hash SHA-256.
    """
    # default=str asegura que fechas o UUIDs se conviertan a texto sin romper el JSON
    lote_string = json.dumps(datos_lote, sort_keys=True, default=str)
    
    # Generamos el hash SHA-256
    hash_sha256 = hashlib.sha256(lote_string.encode('utf-8')).hexdigest()
    
    # Le agregamos el prefijo '0x' estándar de Web3/Polygon
    return f"0x{hash_sha256}"