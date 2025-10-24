"""
Generador de Keywords para Conversor de Divisas
Genera todas las combinaciones de keywords long-tail
"""

# Monedas principales
currencies = {
    'EUR': ['euro', 'euros'],
    'USD': ['dolar', 'dolares', 'dólar', 'dólares'],
    'MXN': ['peso mexicano', 'pesos mexicanos'],
    'ARS': ['peso argentino', 'pesos argentinos'],
    'GBP': ['libra', 'libras', 'libra esterlina'],
    'COP': ['peso colombiano', 'pesos colombianos'],
    'BRL': ['real', 'reales', 'real brasileño'],
    'JPY': ['yen', 'yenes'],
    'CAD': ['dolar canadiense', 'dolares canadienses'],
}

# Plantillas de keywords
templates = [
    # Conversión directa
    "conversor {from} a {to}",
    "convertir {from} a {to}",
    "cambiar {from} a {to}",
    "{from} a {to}",
    
    # Con cantidad
    "cuanto es 100 {from} en {to}",
    "cuanto es 50 {from} en {to}",
    "cuanto vale 1 {from} en {to}",
    
    # Precio/Valor
    "precio del {from} en {to}",
    "valor del {from} en {to}",
    "cotizacion {from} {to}",
    
    # Tiempo
    "{from} a {to} hoy",
    "tipo de cambio {from} {to} hoy",
    "tasa de cambio {from} {to} actual",
    
    # Online/Gratis
    "conversor {from} {to} online",
    "conversor {from} {to} gratis",
    "calculadora {from} {to}",
    
    # Dónde cambiar
    "donde cambiar {from} a {to}",
    "donde cambiar {from} sin comision",
    "mejor sitio para cambiar {from}",
]

# Generar keywords
print("=" * 60)
print("KEYWORDS GENERADAS PARA SEO")
print("=" * 60)
print()

all_keywords = []

# Conversiones directas
print("📊 CONVERSIONES PRINCIPALES:")
print("-" * 60)
for from_code, from_names in currencies.items():
    for to_code, to_names in currencies.items():
        if from_code != to_code:
            for from_name in from_names:
                for to_name in to_names:
                    keyword = f"{from_name} a {to_name}"
                    all_keywords.append(keyword)
                    if len(all_keywords) <= 20:  # Mostrar solo primeras 20
                        print(f"  • {keyword}")

print(f"\nTotal conversiones directas: {len(all_keywords)}")
print()

# Keywords long-tail
print("💎 LONG-TAIL KEYWORDS:")
print("-" * 60)
long_tail = []

amounts = ['100', '50', '1', '1000', '500']
for amount in amounts:
    for from_code, from_names in list(currencies.items())[:3]:
        for to_code, to_names in list(currencies.items())[:3]:
            if from_code != to_code:
                keyword = f"cuanto es {amount} {from_names[0]} en {to_names[0]}"
                long_tail.append(keyword)
                if len(long_tail) <= 15:
                    print(f"  • {keyword}")

print(f"\nTotal long-tail: {len(long_tail)}")
print()

# Keywords por ubicación
print("🌍 KEYWORDS POR UBICACIÓN:")
print("-" * 60)
locations = [
    'en españa',
    'en mexico',
    'en argentina',
    'en colombia',
]

location_keywords = []
for loc in locations:
    for from_code in ['EUR', 'USD']:
        from_name = currencies[from_code][0]
        keywords = [
            f"donde cambiar {from_name} {loc}",
            f"casa de cambio {from_name} {loc}",
            f"precio {from_name} hoy {loc}",
        ]
        location_keywords.extend(keywords)
        for kw in keywords:
            print(f"  • {kw}")

print()

# Keywords de comparación
print("⚖️ KEYWORDS DE COMPARACIÓN:")
print("-" * 60)
comparison = [
    "mejor conversor de divisas online",
    "conversor divisas vs google",
    "conversor divisas mas preciso",
    "conversor divisas sin comision",
    "conversor divisas gratis sin registro",
]
for kw in comparison:
    print(f"  • {kw}")

print()

# FAQ Keywords
print("❓ KEYWORDS PARA FAQ:")
print("-" * 60)
faq_keywords = [
    "como funciona un conversor de divisas",
    "como se calcula el tipo de cambio",
    "que afecta el tipo de cambio",
    "cuando conviene cambiar divisas",
    "donde cambiar divisas sin comision",
    "como ahorrar al cambiar dinero",
    "cual es la mejor tasa de cambio",
    "que es el tipo de cambio mid market",
    "diferencia entre tasa compra y venta",
    "como convertir divisas online",
]
for kw in faq_keywords:
    print(f"  • {kw}")

print()

# Estadísticas finales
print("=" * 60)
print("📈 RESUMEN DE KEYWORDS")
print("=" * 60)
total = len(all_keywords) + len(long_tail) + len(location_keywords) + len(comparison) + len(faq_keywords)
print(f"Total de keywords generadas: {total:,}")
print(f"  • Conversiones directas: {len(all_keywords):,}")
print(f"  • Long-tail: {len(long_tail):,}")
print(f"  • Por ubicación: {len(location_keywords):,}")
print(f"  • Comparación: {len(comparison):,}")
print(f"  • FAQ: {len(faq_keywords):,}")
print()
print("💡 RECOMENDACIÓN:")
print("  1. Usa las top 20 keywords en la homepage")
print("  2. Crea una landing page por cada conversión principal")
print("  3. Integra long-tail en FAQ y blog")
print("  4. Usa keywords de ubicación en meta descriptions")
print()
print("🎯 VOLUMEN ESTIMADO:")
print("  Si capturas solo el 1% del tráfico total:")
print("  465,000 búsquedas/mes × 0.01 = 4,650 visitas/mes")
print("  RPM $5 × 4.65 = ~$23/mes (solo con 1% de tráfico)")
print()
print("  Si capturas el 10% (con buen SEO):")
print("  465,000 × 0.10 = 46,500 visitas/mes")
print("  RPM $5 × 46.5 = ~$232/mes")
print("=" * 60)
