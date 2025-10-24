# 🚀 Guía Completa: Deploy en CyberPanel

## 📋 PREPARATIVOS

### 1. Acceder a CyberPanel
```
URL: https://tu-servidor-ip:8090
Usuario: admin
Contraseña: [tu contraseña]
```

---

## 🌐 PASO 1: Crear el Sitio Web

### En CyberPanel:

1. **Ir a "Websites" → "Create Website"**

2. **Configurar:**
```
Domain Name: convertidordivisas.com
Email: tu@email.com
Package: Default
PHP: 8.1 o superior
```

3. **Click "Create Website"**

4. **Esperar confirmación** ✅

---

## 📁 PASO 2: Subir los Archivos

### Opción A: Via FTP/SFTP (Recomendado)

**Usar FileZilla o similar:**
```
Host: tu-servidor-ip
Port: 21 (FTP) o 22 (SFTP)
Usuario: convertidordivisas.com (el dominio)
Contraseña: [la que configuraste]
```

**Ruta donde subir:**
```
/home/convertidordivisas.com/public_html/
```

**Estructura a subir:**
```
public_html/
├── backend/
│   ├── server.py
│   ├── requirements.txt
│   └── .env
└── frontend/
    ├── build/          # ⚠️ IMPORTANTE: Hacer build primero
    ├── public/
    ├── src/
    ├── package.json
    └── .env
```

### Opción B: Via Terminal SSH

```bash
# 1. Conectar por SSH
ssh root@tu-servidor-ip

# 2. Ir al directorio del sitio
cd /home/convertidordivisas.com/

# 3. Clonar o subir archivos
git clone https://github.com/tu-usuario/conversor-divisas.git
# O usar rsync/scp desde tu máquina local
```

---

## 🔧 PASO 3: Configurar Backend (Python/FastAPI)

### 3.1. Instalar Python y Dependencias

```bash
# Conectar por SSH
ssh root@tu-servidor-ip

# Ir al directorio backend
cd /home/convertidordivisas.com/public_html/backend

# Crear entorno virtual
python3 -m venv venv

# Activar entorno
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt
```

### 3.2. Configurar .env del Backend

```bash
nano .env
```

**Contenido:**
```bash
PORT=8001
# No se requiere base de datos
# Las tasas vienen de API externa gratuita
```

**✅ IMPORTANTE:** Este proyecto NO necesita MySQL ni MongoDB porque:
- Todas las tasas vienen de ExchangeRate-API (externa)
- No hay usuarios ni datos que guardar
- Funciona 100% stateless

### 3.3. Probar Backend

```bash
# Ejecutar manualmente para probar
python server.py

# Si funciona, presiona Ctrl+C
```

### 3.4. Configurar Supervisor (Mantener Backend Corriendo)

```bash
# Crear archivo de configuración
nano /etc/supervisor/conf.d/conversor-backend.conf
```

**Contenido:**
```ini
[program:conversor-backend]
directory=/home/convertidordivisas.com/public_html/backend
command=/home/convertidordivisas.com/public_html/backend/venv/bin/python server.py
user=convertidordivisas.com
autostart=true
autorestart=true
stderr_logfile=/var/log/conversor-backend.err.log
stdout_logfile=/var/log/conversor-backend.out.log
```

**Activar:**
```bash
supervisorctl reread
supervisorctl update
supervisorctl start conversor-backend
supervisorctl status
```

---

## ⚛️ PASO 4: Configurar Frontend (React)

### 4.1. Build del Frontend (EN TU MÁQUINA LOCAL)

```bash
cd /app/frontend

# Editar .env para producción
nano .env
```

**Contenido de .env:**
```bash
REACT_APP_BACKEND_URL=https://convertidordivisas.com
REACT_APP_SITE_NAME=Conversor de Divisas
REACT_APP_SITE_URL=https://convertidordivisas.com
REACT_APP_ADSENSE_CLIENT=ca-pub-TU_ID_REAL_AQUI
```

**Hacer build:**
```bash
yarn install
yarn build
```

**Esto crea la carpeta `/build/`** con archivos optimizados.

### 4.2. Subir Build al Servidor

**Via FTP:**
```
Subir carpeta frontend/build/ completa a:
/home/convertidordivisas.com/public_html/
```

**Via SCP (desde tu máquina):**
```bash
scp -r frontend/build/* root@tu-servidor-ip:/home/convertidordivisas.com/public_html/
```

---

## 🔒 PASO 5: Configurar SSL (HTTPS)

### En CyberPanel:

1. **Ir a "SSL" → "Issue SSL"**
2. **Seleccionar:** convertidordivisas.com
3. **Click "Issue SSL"**
4. **Esperar 1-2 minutos** ✅

### Verificar:
```
https://convertidordivisas.com
```

---

## 🌐 PASO 6: Configurar Nginx (Proxy para Backend)

### 6.1. Editar configuración Nginx

```bash
# Encontrar archivo de configuración
cd /usr/local/lsws/conf/vhosts/convertidordivisas.com/

# O en OpenLiteSpeed:
cd /usr/local/lsws/conf/vhosts/

# Buscar archivo .conf del dominio
```

### 6.2. Configuración Nginx para CyberPanel

**Crear archivo:**
```bash
nano /etc/nginx/sites-available/convertidordivisas.com
```

**Contenido:**
```nginx
server {
    listen 80;
    server_name convertidordivisas.com www.convertidordivisas.com;
    
    # Redirigir a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name convertidordivisas.com www.convertidordivisas.com;
    
    # SSL (CyberPanel lo configura automáticamente)
    ssl_certificate /etc/letsencrypt/live/convertidordivisas.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/convertidordivisas.com/privkey.pem;
    
    root /home/convertidordivisas.com/public_html/build;
    index index.html;
    
    # Frontend (React)
    location / {
        try_files $uri $uri/ /index.html;
        add_header Cache-Control "public, max-age=31536000";
    }
    
    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:8001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Sitemap
    location = /sitemap.xml {
        try_files $uri =404;
    }
    
    # Robots
    location = /robots.txt {
        try_files $uri =404;
    }
    
    # Compresión Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/css application/javascript application/json image/svg+xml;
}
```

**Activar configuración:**
```bash
ln -s /etc/nginx/sites-available/convertidordivisas.com /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

---

## 🧪 PASO 7: Probar Todo

### 7.1. Test Backend

```bash
curl https://convertidordivisas.com/api/health
```

**Debe devolver:**
```json
{"status":"ok","message":"API funcionando correctamente"}
```

### 7.2. Test Frontend

**Abrir en navegador:**
```
https://convertidordivisas.com
```

**Verificar:**
- ✅ Página carga
- ✅ Conversor funciona
- ✅ Gráfico histórico aparece
- ✅ FAQ se despliega

### 7.3. Test API Conversion

```bash
curl "https://convertidordivisas.com/api/convert?amount=100&from_currency=EUR&to_currency=USD"
```

---

## 🔍 PASO 8: SEO Post-Deploy

### 8.1. Google Search Console

1. **Ir a:** https://search.google.com/search-console/
2. **Agregar propiedad:** convertidordivisas.com
3. **Verificar con DNS** (recomendado)

**En CyberPanel:**
```
DNS → Manage → Agregar registro TXT
Nombre: @
Valor: google-site-verification=XXXXXX
```

4. **Enviar sitemap:**
```
https://convertidordivisas.com/sitemap.xml
```

### 8.2. Solicitar Indexación

En Search Console > Inspección de URLs:
```
https://convertidordivisas.com/
https://convertidordivisas.com/euro-a-dolar
https://convertidordivisas.com/dolar-a-peso-mexicano
https://convertidordivisas.com/dolar-a-peso-argentino
```

Click "Solicitar indexación" en cada una.

---

## 📊 PASO 9: Configurar Analytics

### 9.1. Google Analytics 4

1. **Crear propiedad** en https://analytics.google.com/
2. **Obtener Measurement ID** (formato: G-XXXXXXXXXX)
3. **Editar** `/home/convertidordivisas.com/public_html/build/index.html`

**Agregar antes de `</head>`:**
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## 💰 PASO 10: Configurar AdSense

### 10.1. Solicitar Cuenta AdSense

1. **Ir a:** https://www.google.com/adsense/
2. **Crear cuenta**
3. **Verificar sitio** (agregar código en `<head>`)

### 10.2. Código de Verificación AdSense

**Editar:** `frontend/.env` (ANTES de hacer build)
```bash
REACT_APP_ADSENSE_CLIENT=ca-pub-1234567890123456
```

**Rebuild y resubir:**
```bash
yarn build
# Subir nuevamente build/ al servidor
```

---

## 🚨 SOLUCIÓN DE PROBLEMAS

### Backend no responde

```bash
# Ver logs
tail -f /var/log/conversor-backend.err.log

# Reiniciar
supervisorctl restart conversor-backend
```

### Frontend muestra página en blanco

```bash
# Verificar permisos
chown -R convertidordivisas.com:convertidordivisas.com /home/convertidordivisas.com/public_html/

# Verificar que index.html existe
ls -la /home/convertidordivisas.com/public_html/build/
```

### API da error CORS

**Editar** `backend/server.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://convertidordivisas.com"],  # Cambiar aquí
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### SSL no funciona

```bash
# Renovar SSL manualmente
certbot renew
systemctl reload nginx
```

---

## 📋 CHECKLIST FINAL

- [ ] Dominio apuntando a servidor
- [ ] CyberPanel instalado y funcionando
- [ ] Sitio web creado en CyberPanel
- [ ] Backend Python corriendo (Supervisor)
- [ ] Frontend build subido
- [ ] Nginx configurado (proxy API)
- [ ] SSL instalado (HTTPS)
- [ ] Search Console verificado
- [ ] Sitemap enviado
- [ ] Analytics configurado
- [ ] AdSense ID configurado
- [ ] Tests pasando (API + Frontend)

---

## 🎯 COMANDOS ÚTILES CYBERPANEL

```bash
# Ver logs de CyberPanel
journalctl -u lscpd -f

# Reiniciar OpenLiteSpeed
systemctl restart lsws

# Ver logs Nginx
tail -f /var/log/nginx/error.log

# Estado Supervisor
supervisorctl status

# Ver logs aplicación
tail -f /var/log/conversor-backend.out.log
```

---

## 💡 OPTIMIZACIONES ADICIONALES

### Caching con Redis (Opcional)

```bash
# Instalar Redis
apt install redis-server

# En backend/server.py agregar cache
```

### CDN con Cloudflare (Gratis)

1. Crear cuenta en cloudflare.com
2. Agregar dominio
3. Cambiar nameservers
4. Activar modo proxy (nube naranja)
5. Configurar cache rules

---

## 🎉 ¡LISTO!

Tu conversor está **LIVE** en:
```
https://convertidordivisas.com
```

**Próximos pasos:**
1. Monitorear tráfico en Analytics
2. Esperar aprobación AdSense (1-3 días)
3. Crear contenido de blog
4. Promocionar en redes sociales
5. Conseguir backlinks

**¡Éxito con tu proyecto!** 💰🚀
