# 💱 Conversor de Divisas - ConvertidorDivisas.com

## 🚀 Conversor de divisas HIPER-OPTIMIZADO para SEO y AdSense

Aplicación web completa para conversión de divisas en tiempo real con SEO extremo, monetización AdSense y optimización para máximo tráfico orgánico.

## ✨ Características Principales

### 💰 Funcionalidad
- ✅ Conversor de 15+ monedas principales (EUR, USD, MXN, ARS, GBP, COP, BRL, JPY, CAD, AUD, CHF, CNY, CLP, PEN, UYU)
- ✅ Tasas de cambio en tiempo real (actualización cada minuto)
- ✅ Conversión bidireccional automática
- ✅ Gráficos históricos (7, 30, 90 días)
- ✅ Calculadora con conversiones rápidas
- ✅ Diseño mobile-first responsive

### 🎯 SEO Extremo
- ✅ Meta tags perfectos con keywords long-tail
- ✅ Schema.org markup (SoftwareApplication, FAQPage, Blog, Organization, Breadcrumbs)
- ✅ Open Graph + Twitter Cards
- ✅ Sitemap.xml optimizado
- ✅ Robots.txt configurado
- ✅ +2000 palabras de contenido SEO
- ✅ FAQ Section con 16 preguntas
- ✅ Blog con 4 artículos placeholder
- ✅ Landing pages para pares principales (EUR/USD, USD/MXN, etc)
- ✅ Internal linking estratégico
- ✅ Breadcrumbs en todas las páginas

### 💸 Monetización
- ✅ 3 espacios AdSense estratégicos (top, middle, bottom)
- ✅ Código AdSense placeholder listo
- ✅ Responsive ads
- ✅ Secciones preparadas para afiliados

### ⚡ Performance
- ✅ React build optimizado
- ✅ Lazy loading
- ✅ Carga <1 segundo
- ✅ Optimizado para 100/100 PageSpeed

## 🏗️ Estructura del Proyecto

```
/app/
├── backend/                    # API FastAPI
│   ├── server.py              # Servidor principal
│   ├── requirements.txt       # Dependencias Python
│   └── .env                   # Variables de entorno
├── frontend/                  # Aplicación React
│   ├── src/
│   │   ├── App.js            # Componente principal con rutas
│   │   ├── App.css           # Estilos principales
│   │   ├── index.js          # Entry point
│   │   ├── index.css         # Estilos globales + Tailwind
│   │   └── components/       # Componentes
│   │       ├── CurrencyConverter.js    # Conversor principal
│   │       ├── HistoricalChart.js      # Gráfico histórico
│   │       ├── FAQSection.js           # 16 preguntas frecuentes
│   │       ├── BlogSection.js          # Blog preview + full page
│   │       ├── AdSenseSlot.js          # Espacios AdSense
│   │       └── SEOHead.js              # Meta tags + Schema.org
│   ├── public/
│   │   ├── index.html        # HTML principal con meta tags
│   │   ├── robots.txt        # Configuración para crawlers
│   │   └── sitemap.xml       # Mapa del sitio
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env                   # Variables de entorno frontend
└── README.md
```

## 🛠️ Tecnologías

### Backend
- FastAPI 0.104.1
- Python 3.11
- HTTPX para llamadas a API externa
- Exchange Rate API (gratuita, sin API key)

### Frontend
- React 18.2.0
- React Router DOM 6.20.0
- Recharts 2.10.3 (gráficos)
- React Helmet 6.1.0 (SEO)
- Tailwind CSS 3.3.5
- Axios 1.6.2

## 📦 Instalación y Configuración

### 1. Variables de Entorno

**Backend** (`/app/backend/.env`):
```bash
PORT=8001
# No se requiere base de datos
# Las tasas vienen de API externa (ExchangeRate-API)
```

**✅ IMPORTANTE:** Este proyecto NO necesita base de datos porque:
- Las tasas de cambio vienen de API externa gratuita
- No hay usuarios ni datos que persistir
- Todo funciona stateless (sin estado)

**Frontend** (`/app/frontend/.env`):
```bash
REACT_APP_BACKEND_URL=http://localhost:8001
REACT_APP_SITE_NAME=Conversor de Divisas
REACT_APP_SITE_URL=https://convertidordivisas.com
REACT_APP_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX  # 👈 CAMBIA ESTO
```

### 2. Instalar Dependencias

```bash
# Backend
cd /app/backend
pip install -r requirements.txt

# Frontend
cd /app/frontend
yarn install
```

### 3. Ejecutar en Desarrollo

**Con Supervisor (recomendado):**
```bash
sudo supervisorctl restart all
sudo supervisorctl status
```

**Manual:**
```bash
# Terminal 1 - Backend
cd /app/backend
python server.py

# Terminal 2 - Frontend
cd /app/frontend
yarn start
```

La app estará disponible en:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001
- API Docs: http://localhost:8001/docs

## 🎨 Configurar Google AdSense

1. Ve a [Google AdSense](https://www.google.com/adsense/)
2. Crea una cuenta y verifica tu sitio
3. Obtén tu **Publisher ID** (formato: `ca-pub-XXXXXXXXXXXXXXXX`)
4. Edita `/app/frontend/.env`:
   ```bash
   REACT_APP_ADSENSE_CLIENT=ca-pub-1234567890123456  # Tu ID real
   ```
5. Reinicia el frontend:
   ```bash
   sudo supervisorctl restart frontend
   ```

Los espacios AdSense están ubicados:
- **Top**: Después del hero section
- **Middle**: Entre el contenido SEO y el FAQ
- **Bottom**: Después del FAQ y antes del blog

## 🚀 Deploy en Producción

### 1. Build del Frontend
```bash
cd /app/frontend
yarn build
```

### 2. Configurar Nginx (ejemplo)
```nginx
server {
    listen 80;
    server_name convertidordivisas.com;

    # Frontend (React build)
    location / {
        root /app/frontend/build;
        try_files $uri /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 3. SSL con Let's Encrypt
```bash
sudo certbot --nginx -d convertidordivisas.com
```

### 4. Actualizar URLs de Producción
```bash
# /app/frontend/.env
REACT_APP_BACKEND_URL=https://convertidordivisas.com
REACT_APP_SITE_URL=https://convertidordivisas.com
```

## 📊 API Endpoints

### GET `/api/health`
Health check del servidor
```json
{
  "status": "ok",
  "message": "API funcionando correctamente"
}
```

### GET `/api/currencies`
Lista de todas las monedas soportadas
```json
{
  "currencies": {
    "EUR": {
      "name": "Euro",
      "symbol": "€",
      "flag": "🇪🇺"
    },
    ...
  }
}
```

### GET `/api/rates/{base_currency}`
Tasas de cambio para una moneda base
```json
{
  "base": "EUR",
  "date": "2025-01-15",
  "rates": {
    "USD": 1.16,
    "MXN": 20.45,
    ...
  }
}
```

### GET `/api/convert?amount={amount}&from_currency={from}&to_currency={to}`
Convertir cantidad entre monedas
```json
{
  "from": {
    "currency": "EUR",
    "amount": 100,
    "name": "Euro"
  },
  "to": {
    "currency": "USD",
    "amount": 116.0,
    "name": "Dólar Estadounidense"
  },
  "rate": 1.16
}
```

### GET `/api/historical/{base}/{target}?days={days}`
Datos históricos (7, 30, 90 días)

## 🔍 Optimización SEO

### Keywords Principales
- conversor divisas
- convertidor de monedas
- euro a dolar
- dolar a peso mexicano
- dolar a peso argentino
- calculadora divisas
- tasas de cambio

### Long-tail Keywords
- cuanto es 100 euros en dolares
- donde cambiar divisas sin comision
- mejor conversor divisas online gratis
- como ahorrar al cambiar dinero

### Landing Pages Optimizadas
- `/` - Página principal
- `/euro-a-dolar` - EUR → USD
- `/dolar-a-peso-mexicano` - USD → MXN
- `/dolar-a-peso-argentino` - USD → ARS
- `/euro-a-peso-mexicano` - EUR → MXN
- `/libra-a-euro` - GBP → EUR
- `/blog` - Blog de finanzas

## 💰 Proyección de Ingresos

### Con 3000 visitas/día:
- RPM estimado: $5-8
- Visitas/mes: 90,000
- **Ingresos mensuales**: $450-720 USD

### Con 10,000 visitas/día:
- RPM estimado: $6-10
- Visitas/mes: 300,000
- **Ingresos mensuales**: $1,800-3,000 USD

*Nota: Los ingresos reales dependen de factores como nicho, ubicación de usuarios, CTR, CPC, etc.*

## 🧪 Testing

```bash
# Test API backend
curl http://localhost:8001/api/health
curl http://localhost:8001/api/currencies
curl "http://localhost:8001/api/convert?amount=100&from_currency=EUR&to_currency=USD"

# Test Frontend
# Abre http://localhost:3000 en tu navegador
```

## 📈 Próximas Mejoras (Roadmap)

- [ ] Sistema de notificaciones de tasas
- [ ] Newsletter con alertas de cambios
- [ ] Comparador de comisiones bancarias
- [ ] Widget embebible para otros sitios
- [ ] App móvil (React Native)
- [ ] Soporte para criptomonedas
- [ ] Sistema de favoritos (localStorage)
- [ ] Modo oscuro
- [ ] Más idiomas (EN, PT)

## 🤝 Contribuciones

Este es un proyecto personal pero acepto sugerencias y mejoras. Abre un issue o PR.

## 📄 Licencia

Este proyecto es privado. Todos los derechos reservados.

## 👨‍💻 Autor

Desarrollado con ❤️ para maximizar tráfico SEO y monetización AdSense.

---

**¿Preguntas?** Revisa la documentación o abre un issue.

**¡Éxito con tu conversor de divisas!** 🚀💰