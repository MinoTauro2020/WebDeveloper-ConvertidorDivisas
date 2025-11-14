import React, { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * FAQPage - Página de Preguntas Frecuentes con componente de acordeón
 * Optimizada para SEO y experiencia de usuario
 */
const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "¿Con qué frecuencia se actualizan las tasas de cambio?",
      answer: "Las tasas de cambio se actualizan cada minuto directamente desde los mercados de divisas internacionales a través de nuestra API de ExchangeRate. Esto garantiza que siempre obtengas la información más precisa y actualizada del mercado Forex. Las actualizaciones son automáticas y se reflejan en tiempo real en todas las conversiones que realizas."
    },
    {
      question: "¿Es gratis usar el conversor?",
      answer: "Sí, nuestro conversor de divisas es 100% gratuito. No necesitas registrarte, no hay límite de conversiones, y nunca te pediremos información de tarjeta de crédito. Nuestro sitio se mantiene mediante publicidad responsable que no interfiere con tu experiencia de usuario. Puedes usar todas las funcionalidades, incluyendo gráficos históricos y conversiones ilimitadas, sin ningún costo."
    },
    {
      question: "¿Por qué el tipo de cambio de mi banco es diferente?",
      answer: "El tipo de cambio que mostramos es el 'mid-market rate' o tasa del mercado medio, que es la tasa real a la que se intercambian las divisas entre bancos en el mercado internacional. Los bancos y casas de cambio añaden un margen de ganancia (spread) a esta tasa, que puede ser del 2% al 10% o más. Por eso, siempre recibirás menos dinero del que indica el mid-market rate. Nuestro conversor te muestra la tasa real para que puedas comparar y detectar cuánta comisión te están cobrando."
    },
    {
      question: "¿Qué es el tipo de cambio mid-market?",
      answer: "El tipo de cambio mid-market (también llamado interbancario o tasa media) es el punto medio entre el precio de compra y venta de una moneda en el mercado de divisas global (Forex). Es la tasa más justa y transparente, utilizada por bancos para negociar entre ellos. No incluye márgenes de beneficio añadidos. Es la tasa que deberías buscar como referencia al comparar servicios de cambio de divisas, aunque en la práctica es casi imposible obtener exactamente esta tasa como consumidor final."
    },
    {
      question: "¿Es seguro usar este sitio?",
      answer: "Sí, nuestro sitio es completamente seguro. Utilizamos conexión encriptada HTTPS para proteger tu navegación. Además, no almacenamos ninguna información personal tuya, no requiere registro, y no guardamos historial de tus conversiones. Solo recopilamos estadísticas anónimas de uso para mejorar el servicio. No procesamos pagos ni solicitamos datos financieros, por lo que tu privacidad está totalmente protegida."
    },
    {
      question: "¿Qué monedas puedo convertir?",
      answer: "Actualmente soportamos más de 15 de las monedas más utilizadas a nivel mundial, incluyendo: Euro (EUR), Dólar Estadounidense (USD), Peso Mexicano (MXN), Peso Argentino (ARS), Libra Esterlina (GBP), Yen Japonés (JPY), Dólar Canadiense (CAD), Franco Suizo (CHF), Real Brasileño (BRL), Peso Colombiano (COP), y más. Estamos trabajando constantemente para añadir más monedas según la demanda de nuestros usuarios."
    },
    {
      question: "¿Puedo usar el conversor en mi móvil?",
      answer: "¡Por supuesto! Nuestro conversor está completamente optimizado para dispositivos móviles. Funciona perfectamente en smartphones y tablets de cualquier marca (iPhone, Android, etc.). El diseño es responsivo, lo que significa que se adapta automáticamente al tamaño de tu pantalla para ofrecerte la mejor experiencia posible. Puedes usar todas las funciones, incluyendo los gráficos históricos, desde cualquier dispositivo."
    },
    {
      question: "¿Muestran comisiones bancarias?",
      answer: "No, las tasas que mostramos son las tasas del mercado real (mid-market) sin incluir comisiones bancarias ni márgenes de beneficio. Cada banco, casa de cambio o servicio de remesas añade sus propias comisiones y márgenes, que pueden variar significativamente. Usa nuestro conversor como referencia del valor real y compara con lo que te ofrecen diferentes servicios. La diferencia entre nuestra tasa y la que te ofrecen es básicamente su comisión."
    },
    {
      question: "¿Cómo funcionan los gráficos históricos?",
      answer: "Nuestros gráficos históricos muestran la evolución del tipo de cambio entre dos monedas durante los últimos 7 o 30 días (dependiendo de la página). Los datos se obtienen de nuestra API y se presentan en un formato visual fácil de entender. Estos gráficos te ayudan a identificar tendencias, ver si una moneda se está fortaleciendo o debilitando, y tomar decisiones más informadas sobre cuándo realizar un cambio de divisas. Puedes pasar el cursor sobre el gráfico para ver valores específicos de cada día."
    },
    {
      question: "¿Dónde es mejor cambiar dinero?",
      answer: "Para obtener las mejores tasas de cambio, te recomendamos: 1) Evitar aeropuertos (tienen las peores tasas, hasta 15% peor), 2) Comparar entre varios bancos y casas de cambio usando nuestra herramienta como referencia, 3) Considerar servicios online como Wise, Revolut o N26 que suelen ofrecer tasas muy cercanas al mid-market, 4) Si cambias grandes cantidades, negocia con casas de cambio locales, 5) Evita cambiar en hoteles. Usa siempre nuestro conversor para calcular cuánto deberías recibir realmente."
    },
    {
      question: "¿Qué factores afectan el tipo de cambio?",
      answer: "Los tipos de cambio fluctúan constantemente por múltiples factores: 1) Políticas de los bancos centrales (tasas de interés), 2) Indicadores económicos (inflación, PIB, empleo), 3) Eventos geopolíticos (elecciones, conflictos, acuerdos comerciales), 4) Oferta y demanda en el mercado, 5) Especulación de inversores, 6) Balanza comercial entre países, 7) Estabilidad política y económica. El mercado Forex opera 24/7 y es extremadamente dinámico, por eso las tasas cambian constantemente."
    },
    {
      question: "¿Puedo confiar en las tasas que muestran?",
      answer: "Sí, absolutamente. Obtenemos nuestras tasas directamente de ExchangeRate-API, una fuente reconocida y utilizada por miles de empresas financieras en todo el mundo. Los datos provienen de los mercados de divisas reales (Forex) y se actualizan cada minuto. Además, mostramos siempre la hora de última actualización para que tengas total transparencia. Puedes verificar nuestras tasas comparándolas con otras fuentes confiables como XE.com o OANDA."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">💱</span>
            <span className="text-white font-bold text-xl">ConvertidorDivisas.es</span>
          </Link>
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-white hover:text-yellow-300 transition">Inicio</Link>
            <Link to="/blog" className="text-white hover:text-yellow-300 transition">Blog</Link>
            <Link to="/faq" className="text-white hover:text-yellow-300 transition font-semibold">FAQ</Link>
            <Link to="/about" className="text-white hover:text-yellow-300 transition">Sobre Nosotros</Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <nav className="text-sm text-white/80 mb-4 max-w-4xl mx-auto">
          <Link to="/" className="hover:text-white">Inicio</Link> &gt; <span>Preguntas Frecuentes</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
            ❓ Preguntas Frecuentes
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-center">
            Encuentra respuestas a las dudas más comunes sobre nuestro conversor de divisas
          </p>

          {/* FAQ Accordion */}
          <div className="space-y-4" role="list" aria-label="Preguntas frecuentes sobre divisas">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition"
                role="listitem"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center bg-white hover:bg-gray-50 transition"
                  aria-expanded={activeIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="font-semibold text-gray-800 pr-4">
                    {faq.question}
                  </span>
                  <span 
                    className={`text-2xl transform transition-transform ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  >
                    ▼
                  </span>
                </button>
                <div
                  id={`faq-answer-${index}`}
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    activeIndex === index 
                      ? 'py-4 max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                  hidden={activeIndex !== index}
                >
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Help Section */}
          <div className="mt-12 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-gray-700 mb-6">
              Si tienes alguna otra pregunta o necesitas más información, no dudes en explorar 
              nuestro blog donde publicamos guías detalladas y artículos sobre divisas y finanzas internacionales.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/blog" 
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition"
              >
                Ver Blog
              </Link>
              <Link 
                to="/" 
                className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition border-2 border-indigo-600"
              >
                Usar el Conversor
              </Link>
            </div>
          </div>

          {/* Schema.org FAQ markup for SEO */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })}
          </script>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-bold text-lg mb-4">ConvertidorDivisas.es</h4>
              <p className="text-gray-400 text-sm">
                El conversor de monedas más rápido y preciso de Internet. Tasas actualizadas en tiempo real.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Enlaces Útiles</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="text-gray-400 hover:text-white">Inicio</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white">Sobre Nosotros</Link></li>
                <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white">Preguntas Frecuentes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacidad" className="text-gray-400 hover:text-white">Política de Privacidad</a></li>
                <li><a href="/terminos" className="text-gray-400 hover:text-white">Términos de Uso</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Síguenos</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white text-2xl">📘</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl">🐦</a>
                <a href="#" className="text-gray-400 hover:text-white text-2xl">📷</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 ConvertidorDivisas.es - Todos los derechos reservados</p>
            <p className="mt-2">Tasas de cambio actualizadas mediante ExchangeRate-API</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FAQPage;
