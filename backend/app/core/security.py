from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from app.core.database import supabase_client

security = HTTPBearer()

async def obtener_usuario_actual(credentials: HTTPAuthorizationCredentials = Depends(security)):
    """
    Verifica el token JWT nativo de Supabase y recupera el perfil del usuario.
    """
    token = credentials.credentials
    
    try:
        user_response = supabase_client.auth.get_user(token)
        
        if not user_response or not user_response.user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Token inválido o expirado."
            )
            
        cuenta_id_supabase = user_response.user.id
        
        usuario_data = supabase_client.table("usuarios").select("*").eq("cuenta_id", cuenta_id_supabase).execute()
        
        if not usuario_data.data:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="La cuenta autenticada no tiene un perfil de usuario registrado en el sistema."
            )
            
        return usuario_data.data[0]
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Error de autenticación. Verifica tus credenciales."
        )

def requerir_roles(roles_permitidos: list[str]):
    """
    Fábrica de dependencias para proteger rutas 
    Bloquea el acceso si el rol del usuario no está en la lista permitida.
    """
    def validador_roles(usuario: dict = Depends(obtener_usuario_actual)):
        if usuario.get("rol") not in roles_permitidos:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Acceso denegado. Se requiere uno de los siguientes roles: {', '.join(roles_permitidos)}"
            )
        return usuario
    return validador_roles