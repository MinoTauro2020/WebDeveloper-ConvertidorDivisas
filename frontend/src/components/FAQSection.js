import React, { useState } from 'react';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "¿Cómo funciona el conversor de divisas?",
      answer: "Nuestro conversor obtiene las tasas de cambio en tiempo real desde fuentes oficiales del mercado de divisas (Forex). Simplemente ingresa la cantidad, selecciona las monedas de origen y destino, y obtendrás el resultado instantáneamente con la tasa actualizada."
    },
    {
      question: "¿Con qué frecuencia se actualizan las tasas de cambio?",
      answer: "Las tasas de cambio se actualizan cada minuto desde nuestra API de Exchange Rate. Esto garantiza que siempre obtengas la información más precisa y actualizada del mercado."
    },
    {
      question: "¿Es gratis usar el conversor de divisas?",
      answer: "Sí, nuestro conversor de divisas es 100% gratuito. No necesitas registrarte ni proporcionar ningún dato personal. Puedes convertir todas las monedas que necesites sin límites."
    },
    {
      question: "¿Cuánto es 100 euros en dólares?",
      answer: "La conversión de 100 euros a dólares varía según la tasa de cambio actual. Por ejemplo, si la tasa es 1 EUR = 1.10 USD, entonces 100 euros serían aproximadamente 110 dólares. Usa nuestra calculadora arriba para obtener el valor exacto en tiempo real."
    },
    {
      question: "¿Qué monedas puedo convertir?",
      answer: "Soportamos más de 15 monedas principales: Euro (EUR), Dólar (USD), Peso Mexicano (MXN), Peso Argentino (ARS), Libra Esterlina (GBP), Real Brasileño (BRL), Peso Colombiano (COP), Yen Japonés (JPY), Dólar Canadiense (CAD), Franco Suizo (CHF), y más."
    },
    {
      question: "¿Por qué varía el tipo de cambio?",
      answer: "El tipo de cambio varía constantemente debido a factores como: políticas económicas de los bancos centrales, eventos geopolíticos, inflación, tasas de interés, y oferta/demanda en el mercado Forex. El mercado de divisas opera 24/7."
    },
    {
      question: "¿Las casas de cambio usan estas tasas?",
      answer: "Las tasas que mostramos son las tasas reales del mercado (mid-market rate). Las casas de cambio, bancos y servicios de envío de dinero suelen añadir una comisión o margen a estas tasas. Usa nuestro conversor para saber cuánto deberías recibir realmente."
    },
    {
      question: "¿Dónde puedo cambiar dinero al mejor precio?",
      answer: "Para obtener el mejor tipo de cambio: 1) Evita los aeropuertos (tienen las peores tasas), 2) Compara entre bancos y casas de cambio, 3) Considera servicios online como Wise o Revolut que ofrecen tasas cercanas al mercado, 4) Negocia en casas de cambio locales si cambias grandes cantidades."
    },
    {
      question: "¿Cuál es la diferencia entre tasa de compra y venta?",
      answer: "La tasa de compra es el precio al que una casa de cambio compra divisas extranjeras de ti. La tasa de venta es el precio al que te venden divisas. La diferencia entre ambas es el margen de ganancia del cambista. Nosotros mostramos la tasa mid-market (punto medio)."
    },
    {
      question: "¿Conviene cambiar dólares ahora o esperar?",
      answer: "Predecir movimientos de divisas es complejo y arriesgado. Usa nuestros gráficos históricos para identificar tendencias, pero recuerda que el rendimiento pasado no garantiza resultados futuros. Si necesitas el dinero pronto, es mejor cambiar; si es a largo plazo, puedes monitorear el mercado."
    },
    {
      question: "¿Qué es el tipo de cambio mid-market?",
      answer: "El tipo de cambio mid-market (o interbancario) es el punto medio entre los precios de compra y venta en el mercado de divisas. Es la tasa más justa y transparente, usada por bancos para negociar entre ellos. Es la tasa que mostramos en nuestro conversor."
    },
    {
      question: "¿Cómo puedo ahorrar al cambiar dinero?",
      answer: "Consejos para ahorrar: 1) Compara tasas entre múltiples proveedores, 2) Evita cambiar en aeropuertos u hoteles, 3) Usa tarjetas sin comisión por cambio (como Revolut o N26), 4) Cambia cantidades grandes para negociar mejores tasas, 5) Considera servicios online que suelen tener mejores tasas que bancos tradicionales."
    },
    {
      question: "¿Qué son las comisiones ocultas en cambio de divisa?",
      answer: "Las comisiones ocultas incluyen: 1) Margen sobre el tipo de cambio (diferencia entre la tasa real y la que te ofrecen), 2) Comisiones fijas por transacción, 3) Cargos por retiro o envío, 4) Comisiones de intermediarios. Siempre pregunta por el 'all-in rate' (tasa final que recibirás después de todos los cargos)."
    },
    {
      question: "¿Puedo usar este conversor en mi móvil?",
      answer: "Sí, nuestro conversor está optimizado para dispositivos móviles. Funciona perfectamente en smartphones y tablets con cualquier navegador. La interfaz es responsive y fácil de usar en pantallas pequeñas."
    },
    {
      question: "¿Cómo se calcula el tipo de cambio cruzado?",
      answer: "Un tipo de cambio cruzado se calcula cuando conviertes entre dos monedas que no son el dólar estadounidense. Por ejemplo, para EUR/MXN, se calcula: EUR/USD × USD/MXN. Nuestro conversor hace estos cálculos automáticamente para darte la tasa correcta."
    },
    {
      question: "¿Qué afecta más al tipo de cambio euro-dólar?",
      answer: "Los principales factores son: 1) Decisiones de tasas de interés de la Fed (USA) y BCE (Europa), 2) Datos económicos (PIB, empleo, inflación), 3) Estabilidad política, 4) Eventos geopolíticos globales, 5) Flujos de inversión entre Europa y USA."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl mx-auto" id="faq" data-testid="faq-section">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          ❓ Preguntas Frecuentes (FAQ)
        </h2>
        <p className="text-gray-600 text-lg">
          Encuentra respuestas a las dudas más comunes sobre conversión de divisas
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="border-2 border-gray-200 rounded-xl overflow-hidden hover:border-indigo-300 transition"
            data-testid={`faq-item-${index}`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
              data-testid={`faq-question-${index}`}
            >
              <span className="font-semibold text-gray-800 pr-4">
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 text-indigo-600 transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-white" data-testid={`faq-answer-${index}`}>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Schema.org FAQPage markup */}
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
  );
};

export default FAQSection;