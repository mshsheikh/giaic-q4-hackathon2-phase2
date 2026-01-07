from typing import Optional
from fastapi import Request, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from utils.auth import verify_token


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)

        if credentials:
            if not credentials.scheme == "Bearer":
                print(f"DEBUG: Invalid authentication scheme: {credentials.scheme}")
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Invalid authentication scheme."
                )
            token = credentials.credentials
            print(f"DEBUG: Verifying JWT token: {token[:20]}...")
            user_id = self.verify_jwt(token)
            if not user_id:
                print(f"DEBUG: Invalid or expired token - unable to decode JWT")
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid or expired token.",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            # Store user_id in request state for later use
            request.state.user_id = user_id.get("sub")
            print(f"DEBUG: JWT verification successful - user_id: {request.state.user_id}")
            return token
        else:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Invalid authorization code."
            )

    def verify_jwt(self, jwt_token: str) -> Optional[dict]:
        # Log token verification for debugging
        print(f"DEBUG: Verifying JWT token (first 20 chars): {jwt_token[:20] if jwt_token else 'None'}...")
        result = verify_token(jwt_token)
        print(f"DEBUG: JWT verification result: {'SUCCESS' if result else 'FAILED'}")
        return result