from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
import httpx
import os
from datetime import datetime, timedelta
import asyncio

app = FastAPI(title="Conversor de Divisas API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Currency configuration
CURRENCIES = {
    'EUR': {'name': 'Euro', 'symbol': '€', 'flag': '🇪🇺'},
    'USD': {'name': 'Dólar Estadounidense', 'symbol': '$', 'flag': '🇺🇸'},
    'MXN': {'name': 'Peso Mexicano', 'symbol': '$', 'flag': '🇲🇽'},
    'ARS': {'name': 'Peso Argentino', 'symbol': '$', 'flag': '🇦🇷'},
    'GBP': {'name': 'Libra Esterlina', 'symbol': '£', 'flag': '🇬🇧'},
    'COP': {'name': 'Peso Colombiano', 'symbol': '$', 'flag': '🇨🇴'},
    'BRL': {'name': 'Real Brasileño', 'symbol': 'R$', 'flag': '🇧🇷'},
    'JPY': {'name': 'Yen Japonés', 'symbol': '¥', 'flag': '🇯🇵'},
    'CAD': {'name': 'Dólar Canadiense', 'symbol': '$', 'flag': '🇨🇦'},
    'AUD': {'name': 'Dólar Australiano', 'symbol': '$', 'flag': '🇦🇺'},
    'CHF': {'name': 'Franco Suizo', 'symbol': 'CHF', 'flag': '🇨🇭'},
    'CNY': {'name': 'Yuan Chino', 'symbol': '¥', 'flag': '🇨🇳'},
    'CLP': {'name': 'Peso Chileno', 'symbol': '$', 'flag': '🇨🇱'},
    'PEN': {'name': 'Sol Peruano', 'symbol': 'S/', 'flag': '🇵🇪'},
    'UYU': {'name': 'Peso Uruguayo', 'symbol': '$', 'flag': '🇺🇾'},
}

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "API funcionando correctamente"}

@app.get("/api/currencies")
async def get_currencies():
    """Get all available currencies"""
    return {"currencies": CURRENCIES}

@app.get("/api/rates/{base_currency}")
async def get_exchange_rates(base_currency: str):
    """Get current exchange rates for a base currency"""
    base_currency = base_currency.upper()
    
    if base_currency not in CURRENCIES:
        raise HTTPException(status_code=400, detail="Moneda base no válida")
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://api.exchangerate-api.com/v4/latest/{base_currency}",
                timeout=10.0
            )
            response.raise_for_status()
            data = response.json()
            
            # Filter only supported currencies
            filtered_rates = {
                code: rate for code, rate in data['rates'].items() 
                if code in CURRENCIES
            }
            
            return {
                "base": base_currency,
                "date": data.get('date'),
                "rates": filtered_rates,
                "timestamp": datetime.now().isoformat()
            }
    except httpx.HTTPError as e:
        raise HTTPException(status_code=503, detail=f"Error al obtener tasas de cambio: {str(e)}")

@app.get("/api/convert")
async def convert_currency(
    amount: float,
    from_currency: str,
    to_currency: str
):
    """Convert amount from one currency to another"""
    from_currency = from_currency.upper()
    to_currency = to_currency.upper()
    
    if from_currency not in CURRENCIES or to_currency not in CURRENCIES:
        raise HTTPException(status_code=400, detail="Moneda no válida")
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://api.exchangerate-api.com/v4/latest/{from_currency}",
                timeout=10.0
            )
            response.raise_for_status()
            data = response.json()
            
            rate = data['rates'].get(to_currency)
            if not rate:
                raise HTTPException(status_code=400, detail="Tasa de cambio no disponible")
            
            converted_amount = amount * rate
            
            return {
                "from": {
                    "currency": from_currency,
                    "amount": amount,
                    "name": CURRENCIES[from_currency]['name']
                },
                "to": {
                    "currency": to_currency,
                    "amount": round(converted_amount, 2),
                    "name": CURRENCIES[to_currency]['name']
                },
                "rate": rate,
                "date": data.get('date'),
                "timestamp": datetime.now().isoformat()
            }
    except httpx.HTTPError as e:
        raise HTTPException(status_code=503, detail=f"Error al convertir: {str(e)}")

@app.get("/api/historical/{base_currency}/{target_currency}")
async def get_historical_rates(base_currency: str, target_currency: str, days: int = 30):
    """Get historical rates for the last N days (simulated data for demo)"""
    base_currency = base_currency.upper()
    target_currency = target_currency.upper()
    
    if base_currency not in CURRENCIES or target_currency not in CURRENCIES:
        raise HTTPException(status_code=400, detail="Moneda no válida")
    
    try:
        # Get current rate
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"https://api.exchangerate-api.com/v4/latest/{base_currency}",
                timeout=10.0
            )
            response.raise_for_status()
            data = response.json()
            current_rate = data['rates'].get(target_currency, 1.0)
        
        # Generate historical data (simulated with slight variations)
        historical_data = []
        import random
        for i in range(days, 0, -1):
            date = datetime.now() - timedelta(days=i)
            # Add random variation of ±2% for realistic historical data
            variation = random.uniform(-0.02, 0.02)
            rate = current_rate * (1 + variation)
            historical_data.append({
                "date": date.strftime("%Y-%m-%d"),
                "rate": round(rate, 4)
            })
        
        return {
            "base": base_currency,
            "target": target_currency,
            "historical": historical_data
        }
    except Exception as e:
        raise HTTPException(status_code=503, detail=f"Error al obtener datos históricos: {str(e)}")

# Serve React app
try:
    app.mount("/", StaticFiles(directory="/app/frontend/build", html=True), name="static")
except Exception as e:
    print(f"Frontend build not found: {e}")

@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    """Serve React app for all routes"""
    try:
        return FileResponse("/app/frontend/build/index.html")
    except:
        return {"message": "Frontend not built yet"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)