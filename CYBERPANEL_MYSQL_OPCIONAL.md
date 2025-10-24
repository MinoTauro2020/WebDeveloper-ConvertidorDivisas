# 🗄️ Guía Opcional: Usar MySQL en CyberPanel

## 📌 IMPORTANTE PRIMERO

**Tu conversor de divisas NO necesita base de datos** porque:
- ✅ Las tasas vienen de API externa (ExchangeRate-API)
- ✅ No hay usuarios que registrar
- ✅ No hay datos persistentes
- ✅ Funciona 100% sin DB

**¿Cuándo SÍ necesitarías MySQL?**
- Si agregas sistema de usuarios/login
- Si quieres guardar conversiones favoritas
- Si implementas alertas de tasas personalizadas
- Si creas un sistema de newsletter

---

## 🔧 Configuración MySQL en CyberPanel (Si lo necesitas)

### 1. Base de Datos Automática

Cuando creas un sitio en CyberPanel, automáticamente se crea:

```
Nombre DB: convertid_db (nombre corto del dominio)
Usuario: convertid_user
Contraseña: [la que configuraste]
Host: localhost
```

### 2. Acceder a phpMyAdmin

```
URL: https://tu-servidor-ip:8090/databases
O desde CyberPanel: Databases → phpMyAdmin
```

### 3. Encontrar Credenciales MySQL

**En CyberPanel:**
```
1. Ir a: Databases → List Databases
2. Buscar: convertidordivisas.com
3. Ver credenciales:
   - Database Name: convertid_db
   - Database Username: convertid_user
   - Database Password: [click "Show Password"]
```

---

## 📊 Ejemplo: Agregar Funcionalidad con MySQL

### Caso de Uso: Guardar Conversiones Favoritas

#### 1. Crear Tabla en MySQL

**Via phpMyAdmin:**
```sql
CREATE TABLE favorite_conversions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_currency VARCHAR(3) NOT NULL,
    to_currency VARCHAR(3) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    user_ip VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_currencies (from_currency, to_currency)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

#### 2. Instalar Cliente MySQL en Python

```bash
cd /app/backend
source venv/bin/activate
pip install pymysql
pip freeze > requirements.txt
```

#### 3. Actualizar backend/.env

```bash
# Base de datos MySQL (CyberPanel)
DB_HOST=localhost
DB_NAME=convertid_db
DB_USER=convertid_user
DB_PASSWORD=tu_password_aqui
DB_PORT=3306

# API Config
PORT=8001
```

#### 4. Actualizar backend/server.py

**Agregar al inicio:**
```python
import pymysql
import os
from contextlib import contextmanager

# Configuración MySQL
DB_CONFIG = {
    'host': os.environ.get('DB_HOST', 'localhost'),
    'user': os.environ.get('DB_USER', ''),
    'password': os.environ.get('DB_PASSWORD', ''),
    'database': os.environ.get('DB_NAME', ''),
    'port': int(os.environ.get('DB_PORT', 3306)),
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

@contextmanager
def get_db_connection():
    """Context manager para conexión MySQL"""
    connection = pymysql.connect(**DB_CONFIG)
    try:
        yield connection
        connection.commit()
    except Exception as e:
        connection.rollback()
        raise e
    finally:
        connection.close()
```

**Agregar endpoint para guardar favoritos:**
```python
@app.post("/api/favorites")
async def save_favorite(
    from_currency: str,
    to_currency: str,
    amount: float,
    request: Request
):
    """Guardar conversión favorita"""
    try:
        user_ip = request.client.host
        
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                sql = """
                INSERT INTO favorite_conversions 
                (from_currency, to_currency, amount, user_ip)
                VALUES (%s, %s, %s, %s)
                """
                cursor.execute(sql, (from_currency, to_currency, amount, user_ip))
                
                return {
                    "status": "success",
                    "message": "Favorito guardado",
                    "id": cursor.lastrowid
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/favorites/popular")
async def get_popular_conversions():
    """Obtener conversiones más populares"""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                sql = """
                SELECT 
                    from_currency, 
                    to_currency, 
                    COUNT(*) as count
                FROM favorite_conversions
                GROUP BY from_currency, to_currency
                ORDER BY count DESC
                LIMIT 10
                """
                cursor.execute(sql)
                results = cursor.fetchall()
                
                return {
                    "popular_conversions": results
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

#### 5. Frontend: Botón "Guardar Favorito"

**En CurrencyConverter.js:**
```javascript
const saveFavorite = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/favorites`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_currency: fromCurrency,
          to_currency: toCurrency,
          amount: amount
        })
      }
    );
    
    if (response.ok) {
      alert('¡Favorito guardado! ⭐');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// Agregar botón
<button 
  onClick={saveFavorite}
  className="px-4 py-2 bg-yellow-500 text-white rounded"
>
  ⭐ Guardar como Favorito
</button>
```

---

## 🎯 Caso de Uso 2: Sistema de Alertas

### Tabla para Alertas

```sql
CREATE TABLE price_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    from_currency VARCHAR(3) NOT NULL,
    to_currency VARCHAR(3) NOT NULL,
    target_rate DECIMAL(10, 6) NOT NULL,
    alert_type ENUM('above', 'below') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_active (is_active),
    INDEX idx_currencies (from_currency, to_currency)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Endpoint para Crear Alerta

```python
@app.post("/api/alerts")
async def create_alert(
    email: str,
    from_currency: str,
    to_currency: str,
    target_rate: float,
    alert_type: str
):
    """Crear alerta de precio"""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                sql = """
                INSERT INTO price_alerts 
                (email, from_currency, to_currency, target_rate, alert_type)
                VALUES (%s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    email, 
                    from_currency, 
                    to_currency, 
                    target_rate, 
                    alert_type
                ))
                
                return {
                    "status": "success",
                    "message": "Alerta creada. Te notificaremos por email.",
                    "alert_id": cursor.lastrowid
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## 🎯 Caso de Uso 3: Analytics Interno

### Tabla de Estadísticas

```sql
CREATE TABLE conversion_stats (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_currency VARCHAR(3) NOT NULL,
    to_currency VARCHAR(3) NOT NULL,
    amount DECIMAL(15, 2) NOT NULL,
    user_country VARCHAR(2),
    user_ip VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_date (created_at),
    INDEX idx_currencies (from_currency, to_currency)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### Endpoint para Registrar Conversión

```python
@app.post("/api/stats/conversion")
async def log_conversion(
    from_currency: str,
    to_currency: str,
    amount: float,
    request: Request
):
    """Registrar estadística de conversión"""
    try:
        user_ip = request.client.host
        
        # Opcional: Detectar país por IP (requiere biblioteca geoip2)
        user_country = None  # O usa una API de geolocalización
        
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                sql = """
                INSERT INTO conversion_stats 
                (from_currency, to_currency, amount, user_ip, user_country)
                VALUES (%s, %s, %s, %s, %s)
                """
                cursor.execute(sql, (
                    from_currency, 
                    to_currency, 
                    amount, 
                    user_ip,
                    user_country
                ))
                
        return {"status": "logged"}
    except:
        # No fallar si falla el logging
        return {"status": "skipped"}

@app.get("/api/stats/dashboard")
async def get_stats():
    """Dashboard de estadísticas internas"""
    try:
        with get_db_connection() as conn:
            with conn.cursor() as cursor:
                # Conversiones por día
                cursor.execute("""
                    SELECT 
                        DATE(created_at) as date,
                        COUNT(*) as conversions
                    FROM conversion_stats
                    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
                    GROUP BY DATE(created_at)
                    ORDER BY date DESC
                """)
                daily_stats = cursor.fetchall()
                
                # Pares más populares
                cursor.execute("""
                    SELECT 
                        from_currency,
                        to_currency,
                        COUNT(*) as count
                    FROM conversion_stats
                    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                    GROUP BY from_currency, to_currency
                    ORDER BY count DESC
                    LIMIT 10
                """)
                popular_pairs = cursor.fetchall()
                
                return {
                    "daily_stats": daily_stats,
                    "popular_pairs": popular_pairs
                }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

---

## 📋 Checklist para Migrar a MySQL

Si decides agregar MySQL:

- [ ] Obtener credenciales DB de CyberPanel
- [ ] Crear tablas necesarias en phpMyAdmin
- [ ] Instalar `pymysql` en backend
- [ ] Actualizar `backend/.env` con credenciales
- [ ] Agregar código de conexión en `server.py`
- [ ] Crear endpoints necesarios
- [ ] Actualizar frontend para usar nuevos endpoints
- [ ] Probar conexión y queries
- [ ] Reiniciar backend: `supervisorctl restart conversor-backend`

---

## 🔒 Seguridad MySQL

### 1. Nunca Exponer Credenciales

```bash
# ❌ MAL
DB_PASSWORD=mipassword123

# ✅ BIEN (usa variables de entorno del sistema)
DB_PASSWORD=${MYSQL_PASSWORD}
```

### 2. Usar Prepared Statements

```python
# ✅ BIEN (protege contra SQL injection)
cursor.execute(
    "SELECT * FROM users WHERE email = %s",
    (email,)
)

# ❌ MAL (vulnerable a SQL injection)
cursor.execute(f"SELECT * FROM users WHERE email = '{email}'")
```

### 3. Limitar Permisos Usuario DB

```sql
-- Solo dar permisos necesarios
GRANT SELECT, INSERT, UPDATE ON convertid_db.* TO 'convertid_user'@'localhost';
FLUSH PRIVILEGES;
```

---

## 🎯 RESUMEN

**TU PROYECTO ACTUAL:**
✅ NO necesita MySQL
✅ Funciona 100% sin base de datos
✅ Listo para CyberPanel tal como está

**MYSQL SOLO SI AGREGAS:**
- Sistema de usuarios/login
- Favoritos guardados
- Alertas personalizadas
- Analytics interno
- Newsletter/suscripciones

**Para el 99% de los casos:**
👉 **Despliega sin MySQL y funciona perfecto** 👈

Si en el futuro quieres agregar funcionalidades, vuelve a esta guía.

---

**¿Preguntas sobre MySQL en CyberPanel?**
- Consulta: [CyberPanel Docs - Databases](https://cyberpanel.net/docs/databases/)
- Foro: https://community.cyberpanel.net/

**¡Tu conversor está listo para deploy sin base de datos!** 🚀
