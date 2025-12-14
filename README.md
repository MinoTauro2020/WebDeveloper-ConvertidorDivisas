# 🌐 ConvertidorDivisas.es - Web de Cambio de Divisas

## 📋 Descripción

Plataforma completa para conversión de divisas con:
- ✅ Conversor online en tiempo real (15+ monedas)
- ✅ 31 artículos de blog sobre finanzas
- ✅ 5 herramientas interactivas
- ✅ 5 guías locales por país
- ✅ Newsletter + Widget embebible
- ✅ Monetización: Google AdSense + Afiliados

---

## 🚀 CÓMO PONER EN FUNCIONAMIENTO

### **1. INSTALACIÓN LOCAL**

```bash
# Clonar repositorio
git clone [tu-repo-url]
cd WebDeveloper-ConvertidorDivisas

# Navegar a la rama de trabajo
git checkout claude/add-exchange-articles-01XfhSYjkhgW7rB6YMMGHkxm
```

### **2. SERVIR LOCALMENTE**

**Python (Recomendado):**
```bash
python -m http.server 8000
# Accede a: http://localhost:8000
```

**Node.js:**
```bash
npx http-server
# Accede a: http://localhost:8080
```

### **3. DEPLOY A PRODUCCIÓN**

**Vercel (Recomendado):**
```bash
npm install -g vercel
vercel
# Sigue los pasos
```

**GitHub Pages:**
```bash
git push origin main
# Activa Pages en Settings
```

**cPanel/Hosting:**
```bash
# Sube archivos a public_html/ vía FTP
# Asegúrate que .htaccess esté visible
```

---

## 📁 ESTRUCTURA

```
/
├── index.html                          ← Página principal
├── sitemap.xml                         ← SEO
├── robots.txt                          ← SEO
├── widget.js                           ← Widget embebible
├── .htaccess                           ← Redirecciones
├── /blog/                              ← 31 artículos
├── /calculadora-remesas/               ← Herramienta
├── /comparador-casas-cambio/           ← Herramienta
├── /guias/                             ← 5 guías locales
├── /newsletter/                        ← Herramienta
├── /recomendaciones-patrocinadas/      ← Afiliados
├── /contacto/                          ← Contacto
├── /privacidad/                        ← Legal
├── /terminos/                          ← Legal
└── /about/                             ← Sobre nosotros
```

---

## ⚙️ CONFIGURACIÓN

### **Google AdSense**
- Cliente ID: ca-pub-5914722248817610 ✅
- Validar en: https://adsense.google.com

### **Google Search Console** (IMPORTANTE)
```
1. Ve a: https://search.google.com/search-console/
2. Añade: https://convertidordivisas.es
3. Verifica el sitio
4. Envía sitemap: https://convertidordivisas.es/sitemap.xml
```

### **Google Analytics**
- Tracking: G-P2DFPKQEQG ✅

### **Newsletter**
- Actualmente: Formulario HTML
- Para activar: Integra MailChimp/Brevo/SendGrid API

---

## 🔧 TROUBLESHOOTING

**Problema: /blog no carga**
- Verificar .htaccess en raíz
- Asegurar mod_rewrite está activo

**Problema: AdSense no muestra anuncios**
- Esperar 48 horas después de indexación
- Verificar client ID
- Probar en navegador incógnito

**Problema: Widget no funciona en otros sitios**
- Verificar CORS habilitado
- Usar URL completa en script src
- Probar en sitio HTTPS

---

## 📊 MÉTRICAS POST-DEPLOY

Monitorea en:
- Google Search Console (Indexación)
- Google Analytics (Tráfico)
- PageSpeed (Velocidad)

---

## 💰 MONETIZACIÓN

**Activo:**
- ✅ Google AdSense
- ✅ Enlaces Afiliados

**Por Activar:**
- Email Marketing
- Programa de Afiliados
- Cursos Premium

---

## 📞 CONTACTO

- Email: info@convertidordivisas.es
- Bugs: bugs@convertidordivisas.es
- Negocios: business@convertidordivisas.es

---

## ✨ CHECKLIST FINAL

- [ ] Dominio apunta correctamente
- [ ] HTTPS habilitado
- [ ] .htaccess presente
- [ ] Sitemap accesible
- [ ] Google AdSense funciona
- [ ] Analytics activo
- [ ] Mobile responsive
- [ ] Todos los enlaces funcionan
- [ ] Contacto form activo
- [ ] Newsletter forma funciona

**¡LISTO PARA PRODUCCIÓN! 🎉**

---

© 2025 ConvertidorDivisas.es - Todos los derechos reservados
