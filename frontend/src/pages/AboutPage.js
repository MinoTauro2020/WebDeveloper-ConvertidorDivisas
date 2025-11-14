import React from 'react';
import { Link } from 'react-router-dom';

/**
 * AboutPage - Página "Sobre Nosotros" para construir confianza (E-A-T)
 * Esta página ayuda a establecer credibilidad y transparencia del sitio
 */
const AboutPage = () => {
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
            <Link to="/faq" className="text-white hover:text-yellow-300 transition">FAQ</Link>
            <Link to="/about" className="text-white hover:text-yellow-300 transition font-semibold">Sobre Nosotros</Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <nav className="text-sm text-white/80 mb-4 max-w-4xl mx-auto">
          <Link to="/" className="hover:text-white">Inicio</Link> &gt; <span>Sobre Nosotros</span>
        </nav>

        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Sobre Nosotros
            </h1>

            <p className="text-xl text-gray-700 mb-8">
              Bienvenido a ConvertidorDivisas.es, tu herramienta confiable para conversión de monedas en tiempo real.
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">
              🎯 Nuestra Misión
            </h2>
            <p className="text-gray-700 mb-4">
              Nuestra misión es ofrecer <strong>herramientas financieras transparentes y gratuitas</strong> que 
              ayuden a las personas a tomar decisiones informadas al realizar conversiones de divisas. Creemos que 
              todos merecen acceso a información financiera precisa y actualizada, sin costos ocultos ni complejidades innecesarias.
            </p>
            <p className="text-gray-700 mb-4">
              Trabajamos cada día para proporcionar:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Tasas de cambio actualizadas</strong> en tiempo real desde fuentes confiables</li>
              <li><strong>Información transparente</strong> sobre el mercado de divisas</li>
              <li><strong>Herramientas educativas</strong> para entender mejor las finanzas internacionales</li>
              <li><strong>Contenido de calidad</strong> que ayude a ahorrar dinero en operaciones de cambio</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">
              📊 Fuente de Nuestros Datos
            </h2>
            <p className="text-gray-700 mb-4">
              Utilizamos <strong>ExchangeRate-API</strong>, una fuente fiable y reconocida en el sector financiero 
              que proporciona tasas de cambio actualizadas directamente desde los mercados de divisas internacionales.
            </p>
            <p className="text-gray-700 mb-4">
              Esta API es utilizada por miles de empresas y aplicaciones en todo el mundo por su:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Precisión</strong>: Datos obtenidos directamente de los mercados de divisas (Forex)</li>
              <li><strong>Actualización constante</strong>: Las tasas se actualizan cada minuto</li>
              <li><strong>Confiabilidad</strong>: Infraestructura robusta con alta disponibilidad</li>
              <li><strong>Cobertura global</strong>: Más de 160 monedas soportadas</li>
            </ul>

            <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">
              🛡️ Nuestro Compromiso
            </h2>
            
            <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-3">
              Precisión de los Datos
            </h3>
            <p className="text-gray-700 mb-4">
              Nos comprometemos a proporcionar la información más precisa y actualizada posible. Las tasas que 
              mostramos son las tasas reales del mercado (mid-market rate), sin márgenes añadidos. Esto te permite 
              ver el verdadero valor de las conversiones y comparar con lo que ofrecen bancos y casas de cambio.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-3">
              Privacidad del Usuario
            </h3>
            <p className="text-gray-700 mb-4">
              Respetamos tu privacidad. Nuestro conversor funciona 100% en tu navegador y no requiere registro 
              ni información personal. No almacenamos ni rastreamos las conversiones que realizas.
            </p>
            <p className="text-gray-700 mb-4">
              Nuestro compromiso con la privacidad incluye:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Sin registro obligatorio</strong>: Usa todas las funciones sin crear cuenta</li>
              <li><strong>Sin seguimiento de conversiones</strong>: Tus búsquedas son privadas</li>
              <li><strong>Datos mínimos</strong>: Solo recopilamos estadísticas anónimas de uso</li>
              <li><strong>Seguridad</strong>: Conexión encriptada (HTTPS) en todo momento</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mt-6 mb-3">
              Transparencia
            </h3>
            <p className="text-gray-700 mb-4">
              Creemos en la transparencia total. Siempre mostramos:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>La <strong>tasa de cambio exacta</strong> utilizada en cada conversión</li>
              <li>La <strong>hora de última actualización</strong> de las tasas</li>
              <li>La <strong>fuente de los datos</strong> (ExchangeRate-API)</li>
              <li><strong>Gráficos históricos</strong> para que veas las tendencias reales</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
              <p className="text-gray-800">
                <strong>💡 Nota importante:</strong> Las tasas que mostramos son las tasas del mercado medio 
                (mid-market rate). Las casas de cambio, bancos y servicios de remesas suelen añadir un margen 
                a estas tasas. Usa nuestro conversor como referencia para comparar y obtener el mejor trato posible.
              </p>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">
              🌟 ¿Por Qué Confiar en Nosotros?
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg text-gray-800 mb-2">✅ Datos Verificables</h4>
                <p className="text-gray-600">
                  Citamos claramente nuestras fuentes y usamos APIs reconocidas en la industria.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg text-gray-800 mb-2">📚 Contenido Educativo</h4>
                <p className="text-gray-600">
                  Nuestro blog ofrece guías prácticas para ayudarte a entender y ahorrar en cambios de divisa.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg text-gray-800 mb-2">🚀 Siempre Gratis</h4>
                <p className="text-gray-600">
                  No cobramos por usar nuestras herramientas. Nuestro sitio se mantiene con publicidad responsable.
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg text-gray-800 mb-2">🔒 Seguro y Privado</h4>
                <p className="text-gray-600">
                  Tu privacidad es nuestra prioridad. No vendemos ni compartimos tus datos.
                </p>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">
              📧 Contacto
            </h2>
            <p className="text-gray-700 mb-4">
              Si tienes preguntas, sugerencias o comentarios sobre nuestro servicio, nos encantaría escucharte. 
              Estamos comprometidos a mejorar continuamente y valoramos la retroalimentación de nuestros usuarios.
            </p>

            <div className="mt-8 text-center">
              <Link 
                to="/" 
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition mr-4"
              >
                Usar el Conversor
              </Link>
              <Link 
                to="/blog" 
                className="inline-block bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-bold hover:bg-gray-300 transition"
              >
                Leer el Blog
              </Link>
            </div>
          </article>
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
              <h4 className="font-bold text-lg mb-4">Siguenos</h4>
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

export default AboutPage;
