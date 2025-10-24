import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CurrencyConverter from '../CurrencyConverter';
import HistoricalChart from '../HistoricalChart';
import AdSenseSlot from '../AdSenseSlot';
import SEOHead from '../SEOHead';

const EuroADolar = () => {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setContentLoaded(true), 500);
  }, []);

  return (
    <div className="min-h-screen">
      <SEOHead 
        title="Euro a Dólar Hoy: Tendencias, Predicciones y Consejos 2025"
        description="Convierte euros a dólares con tasas actualizadas en 2025. Análisis completo de EUR/USD, predicciones económicas, consejos de ahorro y factores que afectan el tipo de cambio."
        keywords="euro a dolar, cuanto es 100 euros en dolares hoy, convertir euros a dolares sin comision, tasas cambio euro dolar, EUR USD, predicciones euro dolar 2025, reserva federal, BCE"
        url="https://convertidordivisas.es/euro-a-dolar"
      />

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <nav className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">💱</span>
            <span className="text-white font-bold text-xl">ConvertidorDivisas.es</span>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <nav className="text-sm text-white/80 mb-4" aria-label="breadcrumb">
          <Link to="/" className="hover:text-white">Inicio</Link> &gt; <span>Euro a Dólar</span>
        </nav>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Euro a Dólar Hoy: Tendencias, Predicciones y Consejos 2025
        </h1>
        
        <p className="text-xl text-white/90 mb-8 max-w-4xl">
          Descubre todo sobre el tipo de cambio <strong>euro-dólar (EUR/USD)</strong> en 2025. Análisis completo 
          de tendencias actuales, predicciones fundamentadas, factores económicos que influyen en la tasa de cambio, 
          y consejos prácticos para ahorrar dinero en tus conversiones internacionales. Información actualizada 
          sobre las políticas de la Reserva Federal, el BCE, inflación y perspectivas del mercado.
        </p>

        {/* Converter Widget */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto mb-8">
          <CurrencyConverter defaultFrom="EUR" defaultTo="USD" />
        </div>

        {/* AdSense Top */}
        {contentLoaded && (
          <div className="max-w-4xl mx-auto mb-8">
            <AdSenseSlot slot="top" />
          </div>
        )}

        {/* Main Content */}
        <div className="bg-white/95 rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl mx-auto">
          <article className="prose prose-lg max-w-none">
            
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Euro a Dólar en 2025: Contexto Económico y Tendencias Actuales
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                El tipo de cambio <strong>euro-dólar (EUR/USD)</strong> es el par de divisas más negociado del mundo, 
                representando aproximadamente el 28% de todas las transacciones en el mercado Forex. En 2025, este par 
                continúa siendo el barómetro principal de la economía global, reflejando las políticas monetarias de la 
                Reserva Federal (Fed) y el Banco Central Europeo (BCE), así como las dinámicas comerciales entre Estados 
                Unidos y la Eurozona.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Durante el primer trimestre de 2025, el EUR/USD ha mostrado una volatilidad moderada influenciada por 
                varios factores clave: la política de tasas de interés de la Fed, que mantiene tipos entre 4.5-5% tras 
                su ciclo de ajustes anti-inflacionarios; las decisiones del BCE de mantener una política más acomodaticia 
                con tasas alrededor del 3.5%; y la recuperación económica desigual entre ambas regiones. La guerra en 
                Ucrania continúa afectando los precios energéticos en Europa, mientras que Estados Unidos se beneficia 
                de su independencia energética.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Para viajeros, empresarios y personas que realizan transferencias internacionales, entender estas 
                dinámicas es crucial. Una diferencia de incluso 2-3 centavos en el tipo de cambio puede significar 
                ahorrar cientos de euros en transacciones grandes. Nuestro conversor te proporciona tasas actualizadas 
                cada minuto, reflejando el precio real del mercado interbancario.
              </p>
            </section>

            {/* Tips Section */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                💰 7 Tips para Ahorrar al Convertir Euros a Dólares
              </h2>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">1. Evita Cambiar en Aeropuertos</h3>
                <p className="text-gray-700">
                  Las casas de cambio en aeropuertos suelen ofrecer las peores tasas del mercado, con márgenes 
                  que pueden superar el 10-15% sobre la tasa interbancaria real. Si necesitas efectivo urgentemente, 
                  limítate a cambiar solo lo necesario para el transporte inicial y busca opciones mejores en la ciudad.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">2. Usa Tarjetas sin Comisión Internacional</h3>
                <p className="text-gray-700">
                  Tarjetas como Revolut, N26, o Wise (TransferWise) ofrecen tipos de cambio cercanos a la tasa 
                  interbancaria real, ahorrándote entre 3-8% en cada transacción. Muchas de estas tarjetas 
                  también eliminan las comisiones por retiro en cajeros extranjeros hasta ciertos límites mensuales.
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">3. Monitorea las Tendencias del Mercado</h3>
                <p className="text-gray-700">
                  El tipo de cambio EUR/USD fluctúa constantemente. Usa nuestros gráficos históricos para identificar 
                  patrones y momentos óptimos para convertir grandes cantidades. Por ejemplo, si el euro está en un 
                  máximo temporal frente al dólar, puede ser un buen momento para cambiar si no tienes urgencia.
                </p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">4. Compara Diferentes Servicios</h3>
                <p className="text-gray-700">
                  Usa nuestro conversor para conocer la tasa real del mercado, luego compara las ofertas de tu 
                  banco, casas de cambio locales y plataformas online. La diferencia en una transacción de 1000 
                  euros puede ser de 50-100 dólares dependiendo del proveedor que elijas.
                </p>
              </div>

              <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">5. Evita la "Conversión Dinámica de Divisa"</h3>
                <p className="text-gray-700">
                  Cuando pagues con tarjeta en Estados Unidos, algunos comercios te ofrecerán pagar en euros en 
                  lugar de dólares. ¡Rechaza esta opción! La conversión dinámica suele tener tipos de cambio muy 
                  desfavorables. Siempre elige pagar en la moneda local (USD) y deja que tu banco haga la conversión.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-6 rounded-xl mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">6. Considera Transferencias para Grandes Cantidades</h3>
                <p className="text-gray-700">
                  Si necesitas convertir más de 5,000 euros, los servicios especializados de transferencias 
                  internacionales como Wise, OFX o CurrencyFair ofrecen tasas mucho mejores que los bancos 
                  tradicionales, especialmente para montos grandes. Algunos incluso ofrecen tipos de cambio 
                  bloqueados para protegerte de fluctuaciones.
                </p>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-slate-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-3">7. Planifica con Anticipación</h3>
                <p className="text-gray-700">
                  Si sabes que necesitarás dólares en el futuro, monitorea el mercado con tiempo. No esperes 
                  hasta el último momento. Configurar alertas de precio te permitirá aprovechar momentos 
                  favorables del mercado y conseguir mejor tasa de cambio para tus euros.
                </p>
              </div>
            </section>

            {/* Historical Context */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                📊 Historia del Euro frente al Dólar
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                El euro fue introducido como moneda de cuenta en 1999 y como moneda física en 2002, sustituyendo 
                a las monedas nacionales de los países de la Eurozona. En sus inicios, el <strong>tipo de cambio 
                EUR/USD</strong> comenzó en aproximadamente 1.17, pero rápidamente cayó a niveles cercanos a la 
                paridad (1 EUR ≈ 0.82 USD) en el año 2000.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                El período 2002-2008 vio una apreciación significativa del euro, alcanzando su máximo histórico 
                de 1.60 USD en julio de 2008, justo antes de la crisis financiera global. Este fortalecimiento 
                se debió a varios factores: tasas de interés más altas en Europa, dudas sobre la economía 
                estadounidense, y el debilitamiento del dólar por déficits gemelos (fiscal y comercial).
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                La crisis de deuda soberana europea (2010-2012) invirtió esta tendencia, con el euro cayendo 
                significativamente frente al dólar. El Brexit en 2016 y las políticas monetarias divergentes 
                entre la Reserva Federal (Fed) y el Banco Central Europeo (BCE) mantuvieron al euro bajo presión.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                En 2022, por primera vez en 20 años, el euro alcanzó nuevamente la paridad con el dólar (1 EUR = 1 USD), 
                debido a la agresiva política de subida de tipos de la Fed y las preocupaciones por el impacto 
                de la guerra en Ucrania en la economía europea. En 2025, el tipo de cambio se mantiene relativamente 
                estable en el rango de 1.05-1.15 USD por euro, con expectativas de volatilidad moderada.
              </p>
            </section>

            {/* Economic Factors */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                🎯 Factores que Afectan el Tipo de Cambio Euro-Dólar
              </h2>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                1. Política Monetaria de los Bancos Centrales
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Las decisiones sobre tasas de interés de la <strong>Reserva Federal (Fed)</strong> en Estados Unidos 
                y el <strong>Banco Central Europeo (BCE)</strong> son los factores más influyentes. Cuando la Fed 
                sube las tasas, el dólar tiende a fortalecerse porque los inversores buscan mayor rentabilidad. 
                De manera inversa, si el BCE sube las tasas mientras la Fed las mantiene, el euro se aprecia.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                2. Datos Económicos Clave
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Indicadores como el PIB, tasas de desempleo, inflación (IPC), y balances comerciales impactan 
                directamente en el tipo de cambio. Datos sólidos en Estados Unidos generalmente fortalecen el 
                dólar, mientras que cifras positivas de la Eurozona apoyan al euro. Los mercados reaccionan 
                especialmente a las nóminas no agrícolas (NFP) de EE.UU. y los datos de inflación de ambas regiones.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                3. Eventos Geopolíticos
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Crisis políticas, conflictos militares, elecciones importantes o cambios en políticas comerciales 
                pueden causar volatilidad significativa. El dólar suele actuar como "moneda refugio" en tiempos 
                de incertidumbre global, lo que puede debilitar al euro temporalmente. La estabilidad política 
                en Europa también es crucial para la fortaleza del euro.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                4. Flujos de Inversión y Comercio
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Los movimientos de capital entre Europa y Estados Unidos influyen en la demanda de cada divisa. 
                Si los inversores europeos compran acciones estadounidenses, necesitan dólares, lo que aumenta 
                su demanda. Los balances comerciales también importan: un superávit comercial europeo con EE.UU. 
                fortalece el euro, mientras que un déficit lo debilita.
              </p>

              <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                5. Expectativas del Mercado y Sentimiento
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Las expectativas sobre futuros movimientos económicos a menudo son tan importantes como los 
                datos actuales. Si los mercados anticipan que la Fed subirá las tasas, el dólar puede fortalecerse 
                incluso antes de que ocurra. El análisis técnico y el sentimiento de los traders también juegan 
                un papel importante en las fluctuaciones diarias.
              </p>
            </section>

            {/* 2025 Predictions */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                🔮 Predicciones Euro-Dólar para 2025: Análisis y Perspectivas
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                En el primer trimestre de 2025, el par EUR/USD se encuentra en una encrucijada influenciada por 
                múltiples factores macroeconómicos. Analistas de bancos de inversión como Goldman Sachs, JPMorgan 
                y Deutsche Bank proyectan un rango de 1.05-1.15 para el año, con volatilidad esperada en torno a 
                eventos clave de política monetaria.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                Factores Alcistas para el Euro en 2025
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Posible pausa en las subidas de la Fed:</strong> Si la inflación en EE.UU. continúa 
                moderándose, la Fed podría mantener las tasas estables o incluso considerar recortes hacia finales 
                de 2025, lo que debilitaría al dólar.</li>
                <li><strong>Recuperación económica europea:</strong> La estabilización de los precios energéticos 
                y el crecimiento en sectores industriales alemanes podrían fortalecer al euro.</li>
                <li><strong>Normalización del BCE:</strong> Si el BCE mantiene una postura firme contra la inflación, 
                la brecha de tasas de interés con EE.UU. podría reducirse.</li>
                <li><strong>Resolución parcial del conflicto ucraniano:</strong> Cualquier progreso diplomático 
                reduciría la incertidumbre sobre Europa y fortalecería su moneda.</li>
              </ul>

              <h3 className="text-2xl font-bold text-gray-800 mb-3 mt-6">
                Factores Bajistas para el Euro en 2025
              </h3>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Resiliencia de la economía estadounidense:</strong> Si EE.UU. evita una recesión y 
                mantiene un crecimiento robusto, el dólar podría seguir atrayendo flujos de inversión.</li>
                <li><strong>Debilidad estructural europea:</strong> Problemas demográficos, baja productividad 
                y dependencia energética continúan siendo desafíos para la Eurozona.</li>
                <li><strong>Tensiones geopolíticas:</strong> Nuevas crisis en Europa del Este o Medio Oriente 
                podrían hacer que los inversores busquen el dólar como refugio seguro.</li>
                <li><strong>Divergencia de políticas fiscales:</strong> Si EE.UU. implementa estímulos fiscales 
                mientras Europa mantiene austeridad, el dólar podría fortalecerse.</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">💡 Proyección Consenso 2025</h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li><strong>Q1 2025:</strong> Rango 1.05-1.10 (consolidación)</li>
                  <li><strong>Q2 2025:</strong> Posible fortalecimiento hacia 1.10-1.13 si el BCE mantiene firmeza</li>
                  <li><strong>Q3 2025:</strong> Volatilidad moderada 1.08-1.12</li>
                  <li><strong>Q4 2025:</strong> Cierre esperado entre 1.10-1.15 dependiendo de elecciones y datos económicos</li>
                </ul>
                <p className="text-gray-600 text-sm mt-3 italic">
                  Nota: Estas proyecciones son estimaciones basadas en condiciones actuales y pueden cambiar 
                  significativamente ante eventos imprevistos.
                </p>
              </div>
            </section>

            {/* Practical Examples */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                💡 Ejemplos Prácticos de Conversión
              </h2>
              <div className="bg-indigo-50 p-6 rounded-xl mb-4">
                <p className="text-gray-700 mb-2">
                  <strong>Ejemplo 1:</strong> Si el tipo de cambio actual es 1 EUR = 1.10 USD:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>100 euros = 110 dólares</li>
                  <li>500 euros = 550 dólares</li>
                  <li>1,000 euros = 1,100 dólares</li>
                  <li>5,000 euros = 5,500 dólares</li>
                </ul>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-2">
                  <strong>Ejemplo 2:</strong> Ahorro por elegir buen servicio de cambio:
                </p>
                <p className="text-gray-700">
                  Conversión de 2,000 EUR a USD (tasa: 1 EUR = 1.10 USD):
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-2">
                  <li><strong>Tasa real del mercado:</strong> 2,200 USD</li>
                  <li><strong>Aeropuerto (tasa 1.00):</strong> 2,000 USD (pierdes 200 USD)</li>
                  <li><strong>Banco tradicional (tasa 1.06):</strong> 2,120 USD (pierdes 80 USD)</li>
                  <li><strong>Wise/Revolut (tasa 1.09):</strong> 2,180 USD (pierdes 20 USD)</li>
                </ul>
                <p className="text-gray-700 mt-3 font-semibold">
                  ¡Ahorras hasta 180 USD eligiendo el servicio correcto!
                </p>
              </div>
            </section>

            {/* FAQ Snippet */}
            <section className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                ❓ Preguntas Frecuentes sobre Euro a Dólar
              </h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-indigo-500 pl-4 py-2">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    ¿Dónde puedo cambiar euros a dólares sin comisión?
                  </h3>
                  <p className="text-gray-700">
                    Las mejores opciones son plataformas digitales como Wise, Revolut o N26, que ofrecen tipos 
                    de cambio muy cercanos a la tasa interbancaria real con comisiones mínimas o nulas. También 
                    puedes usar cajeros automáticos con tarjetas sin comisión internacional, aunque verifica 
                    los límites de retiro gratuito.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4 py-2">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    ¿Es mejor cambiar euros a dólares en España o en Estados Unidos?
                  </h3>
                  <p className="text-gray-700">
                    Generalmente, obtendrás mejores tasas usando servicios online antes de viajar, o retirando 
                    directamente en cajeros de Estados Unidos con una tarjeta sin comisiones. Las casas de cambio 
                    físicas tanto en España como en EE.UU. suelen tener márgenes elevados. Evita especialmente 
                    los aeropuertos en ambos países.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4 py-2">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    ¿Cuándo es el mejor momento para cambiar euros a dólares en 2025?
                  </h3>
                  <p className="text-gray-700">
                    En 2025, el mejor momento depende de factores como las decisiones de la Fed y el BCE sobre tasas 
                    de interés. Monitorea nuestros gráficos históricos para identificar patrones. Generalmente, cuando 
                    el euro está fuerte (tipo de cambio alto), obtienes más dólares por cada euro. Los analistas 
                    sugieren que los períodos de fortaleza del euro podrían ocurrir en Q2 si el BCE mantiene una 
                    política firme. Sin embargo, predecir movimientos futuros es difícil, así que si necesitas el 
                    dinero pronto, es mejor usar promedios y no especular demasiado.
                  </p>
                </div>

                <div className="border-l-4 border-pink-500 pl-4 py-2">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    ¿Cómo afectan las decisiones de la Reserva Federal y el BCE al tipo de cambio?
                  </h3>
                  <p className="text-gray-700">
                    Las decisiones sobre tasas de interés son cruciales. Cuando la Fed sube las tasas, el dólar se 
                    fortalece porque los inversores buscan mejores rendimientos en activos estadounidenses. Por el 
                    contrario, si el BCE sube las tasas mientras la Fed las mantiene o las baja, el euro se aprecia. 
                    En 2025, la Fed mantiene tasas entre 4.5-5% mientras el BCE está alrededor del 3.5%. La brecha 
                    entre estas tasas es uno de los factores más importantes que afectan el EUR/USD. Mantente atento 
                    a las reuniones de ambos bancos centrales y sus comunicados de prensa para anticipar movimientos.
                  </p>
                </div>
              </div>
            </section>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4">
                ¿Necesitas Convertir Otras Divisas?
              </h3>
              <p className="mb-6">
                Explora nuestros otros conversores especializados con contenido detallado y tasas en tiempo real
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/dolar-a-euro" className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition">
                  USD a EUR →
                </Link>
                <Link to="/dolar-a-peso-mexicano" className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition">
                  USD a MXN →
                </Link>
                <Link to="/euro-a-peso-argentino" className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition">
                  EUR a ARS →
                </Link>
                <Link to="/blog" className="bg-white text-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition">
                  📚 Blog →
                </Link>
              </div>
            </div>

          </article>
        </div>

        {/* Historical Chart */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto mt-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            📈 Evolución EUR/USD - Últimos 30 Días
          </h2>
          <HistoricalChart from="EUR" to="USD" />
        </div>

        {/* AdSense Bottom */}
        {contentLoaded && (
          <div className="max-w-4xl mx-auto mt-8">
            <AdSenseSlot slot="bottom" />
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">ConvertidorDivisas.es</h4>
              <p className="text-gray-400 text-sm">
                Tu conversor de confianza con tasas actualizadas en tiempo real.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Conversiones Populares</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/euro-a-dolar" className="text-gray-400 hover:text-white">Euro a Dólar</Link></li>
                <li><Link to="/dolar-a-peso-mexicano" className="text-gray-400 hover:text-white">USD a MXN</Link></li>
                <li><Link to="/euro-a-peso-argentino" className="text-gray-400 hover:text-white">EUR a ARS</Link></li>
                <li><Link to="/dolar-a-euro" className="text-gray-400 hover:text-white">USD a EUR</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link to="/#faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacidad" className="text-gray-400 hover:text-white">Privacidad</a></li>
                <li><a href="/terminos" className="text-gray-400 hover:text-white">Términos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 ConvertidorDivisas.es - Conversión de divisas en tiempo real</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EuroADolar;
