# 🔍 Guía de Automatización SEO

## 📋 Instrucciones para Actualizar robots.txt y sitemap.xml

Cada vez que generes un nuevo artículo o landing page, **DEBES** actualizar estos archivos:

### 1. 📝 Actualizar `robots.txt`

**Ubicación:** `/frontend/public/robots.txt`

**Para agregar una nueva landing page o ruta:**

```txt
Allow: /nueva-ruta
```

**Ejemplo:** Si creas una landing page `/dolar-a-libra`, añade:
```txt
Allow: /dolar-a-libra
```

**Para rutas de blog:** Ya está cubierto con `Allow: /blog/*`, no necesitas añadir cada artículo individual.

### 2. 🗺️ Actualizar `sitemap.xml`

**Ubicación:** `/frontend/public/sitemap.xml`

**Para agregar una nueva landing page:**

```xml
<url>
  <loc>https://convertidordivisas.es/nueva-ruta</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

**Para agregar un nuevo artículo de blog:**

```xml
<url>
  <loc>https://convertidordivisas.es/blog/slug-del-articulo</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.5</priority>
</url>
```

### 📊 Valores Recomendados

#### `<priority>` (Importancia de la página)
- **1.0**: Página principal (/)
- **0.9**: Landing pages de conversiones principales (euro-a-dolar, dolar-a-peso-mexicano)
- **0.8**: Landing pages de conversiones secundarias
- **0.7**: Página principal del blog (/blog)
- **0.5**: Artículos individuales del blog

#### `<changefreq>` (Frecuencia de actualización)
- **daily**: Páginas de conversión (tasas cambian diariamente)
- **weekly**: Página del blog
- **monthly**: Artículos individuales del blog

#### `<lastmod>` (Última modificación)
- Usa el formato: `YYYY-MM-DD`
- Ejemplo: `2025-10-24`
- Actualiza a la fecha actual cuando modifiques la página

### ✅ Checklist de Verificación

Después de actualizar, verifica:

1. **No hay URLs duplicadas** en el sitemap
2. **Todas las rutas están correctamente codificadas** (sin espacios, caracteres especiales codificados)
3. **El XML es válido** (puedes verificar con validadores online)
4. **Las fechas están en formato correcto** (YYYY-MM-DD)
5. **Los valores de priority están entre 0.0 y 1.0**

### 🔧 Script de Validación

Puedes usar este script de Python para validar tus archivos:

```python
import xml.etree.ElementTree as ET

# Validar sitemap.xml
tree = ET.parse('frontend/public/sitemap.xml')
root = tree.getroot()

urls = []
for url in root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}url'):
    loc = url.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')
    if loc is not None:
        urls.append(loc.text)

print(f"✅ Total URLs: {len(urls)}")

# Check for duplicates
duplicates = [url for url in urls if urls.count(url) > 1]
if duplicates:
    print(f"❌ Duplicate URLs found: {set(duplicates)}")
else:
    print("✅ No duplicate URLs")
```

### 📍 Ubicación de los Archivos

Los archivos deben estar en la carpeta `public` para que sean accesibles públicamente:

```
frontend/
└── public/
    ├── robots.txt    ← Aquí
    └── sitemap.xml   ← Aquí
```

### 🚀 Proceso Paso a Paso

Cuando crees una nueva landing page o artículo:

#### 1. Crear la página/artículo
- Para landing page: Agregar ruta en `App.js`
- Para blog: Agregar entrada en `blogPosts.js`

#### 2. Actualizar `robots.txt`
```txt
# Si es una landing page, añadir:
Allow: /nueva-ruta

# Si es un artículo de blog, ya está cubierto por Allow: /blog/*
```

#### 3. Actualizar `sitemap.xml`
```xml
<!-- Añadir antes del cierre </urlset> -->
<url>
  <loc>https://convertidordivisas.es/nueva-ruta</loc>
  <lastmod>2025-10-24</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.8</priority>
</url>
```

#### 4. Verificar
- Ejecutar script de validación
- Revisar que no haya duplicados
- Confirmar formato correcto

#### 5. Desplegar
- Commit y push de los cambios
- Verificar en producción que los archivos sean accesibles:
  - `https://convertidordivisas.es/robots.txt`
  - `https://convertidordivisas.es/sitemap.xml`

### 🔍 Herramientas Útiles

**Validadores online:**
- Sitemap: https://www.xml-sitemaps.com/validate-xml-sitemap.html
- Robots.txt: https://support.google.com/webmasters/answer/6062598

**Después de actualizar, notificar a Google:**
1. Ve a [Google Search Console](https://search.google.com/search-console/)
2. Selecciona tu propiedad
3. Ve a "Sitemaps"
4. Envía el sitemap actualizado

### 📚 Ejemplo Completo

Si creas una landing page para "Libra a Peso Mexicano":

**1. robots.txt:**
```txt
Allow: /libra-a-peso-mexicano
```

**2. sitemap.xml:**
```xml
<url>
  <loc>https://convertidordivisas.es/libra-a-peso-mexicano</loc>
  <lastmod>2025-10-24</lastmod>
  <changefreq>daily</changefreq>
  <priority>0.8</priority>
</url>
```

### ⚠️ Errores Comunes a Evitar

❌ **NO hacer:**
- Dejar espacios en URLs
- Usar caracteres especiales sin codificar
- Duplicar URLs
- Olvidar actualizar la fecha `lastmod`
- Poner prioridad fuera del rango 0.0-1.0
- Romper el formato XML

✅ **SÍ hacer:**
- Usar guiones (-) en lugar de espacios
- Mantener el formato XML correcto
- Verificar con validadores
- Actualizar fechas
- Mantener orden lógico (principal → secundario)

### 🎯 Automatización Futura

Para automatizar este proceso, puedes crear un script que:

1. Lee todas las rutas de `App.js`
2. Lee todos los slugs de blog de `blogPosts.js`
3. Genera automáticamente `robots.txt` y `sitemap.xml`
4. Actualiza las fechas a la fecha actual

Esto asegurará que nunca olvides actualizar estos archivos.

---

## 📞 Soporte

Si tienes dudas sobre cómo actualizar estos archivos, consulta:
- [Documentación de Google sobre sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Documentación de robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)

---

**Última actualización:** 2025-10-24
