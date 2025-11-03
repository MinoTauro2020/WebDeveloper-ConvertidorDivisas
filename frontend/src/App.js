import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter';
import HistoricalChart from './components/HistoricalChart';
import FAQSection from './components/FAQSection';
import BlogSection from './components/BlogSection';
import AdSenseSlot from './components/AdSenseSlot';
import SEOHead from './components/SEOHead';
import DolarAEuro from './components/LandingPages/DolarAEuro';
import DolarAPesoArgentino from './components/LandingPages/DolarAPesoArgentino';
import DolarAPesoMexicano from './components/LandingPages/DolarAPesoMexicano';
import EuroADolar from './components/LandingPages/EuroADolar';
import EuroAPesoArgentino from './components/LandingPages/EuroAPesoArgentino';
import EuroAPesoMexicano from './components/LandingPages/EuroAPesoMexicano';
import blogPostsData from './data/blogPosts';

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <SEOHead />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/euro-a-dolar" element={<EuroADolar />} />
          <Route path="/dolar-a-peso-mexicano" element={<DolarAPesoMexicano />} />
          <Route path="/euro-a-peso-argentino" element={<EuroAPesoArgentino />} />
          <Route path="/dolar-a-euro" element={<DolarAEuro />} />
          <Route path="/dolar-a-peso-argentino" element={<DolarAPesoArgentino />} />
          <Route path="/euro-a-peso-mexicano" element={<EuroAPesoMexicano />} />
          <Route path="/libra-a-euro" element={<ConversionPage from="GBP" to="EUR" />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  useEffect(() => {
    // Component mounted
  }, []);

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
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <nav className="text-sm text-white/80 mb-4" aria-label="breadcrumb">
          <span>Inicio</span> &gt; <span>Conversor de Divisas</span>
        </nav>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in">
          Conversor de Divisas Online Gratis 2025
        </h1>
        <p className="text-xl md:text-2xl text-white/90 mb-4 max-w-3xl mx-auto">
          Convierte EUR, USD, MXN, ARS y más de 15 monedas con tasas de cambio actualizadas en tiempo real
        </p>
        <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
          El convertidor de monedas más rápido y preciso de Internet. Sin comisiones, sin registro. 
          Calculadora de divisas gratuita con gráficos históricos y tasas actualizadas cada minuto.
        </p>
      </section>

      {/* Main Converter */}
      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto">
          <CurrencyConverter />
        </div>
      </section>

      {/* AdSense Slot 1 */}
      <section className="container mx-auto px-4 py-6">
        <AdSenseSlot slot="top" />
      </section>

      {/* Popular Conversions */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          🔥 Conversiones Más Populares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <ConversionCard 
            from="EUR" 
            to="USD" 
            title="Euro a Dólar"
            description="Convierte euros a dólares estadounidenses al instante"
            link="/euro-a-dolar"
          />
          <ConversionCard 
            from="USD" 
            to="MXN" 
            title="Dólar a Peso Mexicano"
            description="Tasa de cambio USD a MXN actualizada"
            link="/dolar-a-peso-mexicano"
          />
          <ConversionCard 
            from="USD" 
            to="ARS" 
            title="Dólar a Peso Argentino"
            description="Cotización del dólar en Argentina hoy"
            link="/dolar-a-peso-argentino"
          />
        </div>
      </section>

      {/* Historical Chart */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            📊 Evolución de Tasas de Cambio (Últimos 30 Días)
          </h2>
          <HistoricalChart from="EUR" to="USD" />
        </div>
      </section>

      {/* AdSense Slot 2 */}
      <section className="container mx-auto px-4 py-6">
        <AdSenseSlot slot="middle" />
      </section>

      {/* SEO Content Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-white/95 rounded-3xl shadow-2xl p-8 md:p-12 max-w-5xl mx-auto">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              ¿Por Qué Usar Nuestro Conversor de Divisas?
            </h2>
            
            <p className="text-gray-700 mb-4">
              <strong>ConvertidorDivisas.es</strong> es la herramienta definitiva para convertir monedas online de forma gratuita. 
              Ya sea que necesites saber <strong>cuánto es 100 euros en dólares</strong>, 
              <strong>cuál es el precio del dólar en pesos mexicanos hoy</strong>, o 
              <strong>convertir libras esterlinas a euros</strong>, nuestra calculadora de divisas te proporciona 
              tasas de cambio actualizadas en tiempo real.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
              🌍 Monedas Soportadas
            </h3>
            <p className="text-gray-700 mb-4">
              Convertimos más de 15 monedas principales del mundo:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Euro (EUR)</strong> - Moneda oficial de la Unión Europea</li>
              <li><strong>Dólar Estadounidense (USD)</strong> - La divisa más comercializada del mundo</li>
              <li><strong>Peso Mexicano (MXN)</strong> - Moneda de México</li>
              <li><strong>Peso Argentino (ARS)</strong> - Moneda de Argentina</li>
              <li><strong>Libra Esterlina (GBP)</strong> - Moneda del Reino Unido</li>
              <li><strong>Peso Colombiano (COP)</strong> - Moneda de Colombia</li>
              <li><strong>Real Brasileño (BRL)</strong> - Moneda de Brasil</li>
              <li><strong>Yen Japonés (JPY)</strong> - Moneda de Japón</li>
              <li><strong>Dólar Canadiense (CAD)</strong> - Moneda de Canadá</li>
              <li><strong>Franco Suizo (CHF)</strong> - Una de las divisas más estables</li>
              <li>Y muchas más...</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
              ⚡ Características Principales
            </h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg text-gray-800 mb-2">✅ Tasas en Tiempo Real</h4>
                <p className="text-gray-600">
                  Actualizamos las tasas de cambio cada minuto desde fuentes oficiales del mercado de divisas.
                </p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg text-gray-800 mb-2">📈 Gráficos Históricos</h4>
                <p className="text-gray-600">
                  Visualiza la evolución de cualquier par de divisas en los últimos 30 días.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg text-gray-800 mb-2">🔄 Conversión Inversa</h4>
                <p className="text-gray-600">
                  Convierte automáticamente en ambas direcciones con un solo clic.
                </p>
              </div>
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl">
                <h4 className="font-bold text-lg text-gray-800 mb-2">🚀 Sin Registro</h4>
                <p className="text-gray-600">
                  100% gratis, sin necesidad de crear cuenta ni proporcionar datos personales.
                </p>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
              💡 ¿Cómo Funciona el Conversor de Divisas?
            </h3>
            <p className="text-gray-700 mb-4">
              Usar nuestro convertidor de monedas es extremadamente simple:
            </p>
            <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
              <li>Selecciona la <strong>moneda origen</strong> (por ejemplo, Euro)</li>
              <li>Ingresa la <strong>cantidad</strong> que deseas convertir</li>
              <li>Elige la <strong>moneda destino</strong> (por ejemplo, Dólar)</li>
              <li>¡Obtén el resultado al instante con la tasa de cambio actualizada!</li>
            </ol>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
              📱 Optimizado para Móviles
            </h3>
            <p className="text-gray-700 mb-4">
              Nuestro conversor funciona perfectamente en cualquier dispositivo: computadora de escritorio, 
              tablet o smartphone. Convierte divisas sobre la marcha, desde cualquier lugar.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
              🎯 ¿Cuándo Conviene Cambiar Divisas?
            </h3>
            <p className="text-gray-700 mb-4">
              El mercado de divisas (Forex) funciona 24/7 y las tasas cambian constantemente. Algunos factores que afectan:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li><strong>Políticas económicas</strong> de los bancos centrales</li>
              <li><strong>Eventos geopolíticos</strong> y noticias internacionales</li>
              <li><strong>Inflación</strong> y tasas de interés</li>
              <li><strong>Oferta y demanda</strong> en el mercado</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Usa nuestros gráficos históricos para identificar tendencias y tomar mejores decisiones al cambiar dinero.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
              💰 Ahorra Dinero al Cambiar Divisas
            </h3>
            <p className="text-gray-700 mb-4">
              Conocer la tasa de cambio real te ayuda a:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>Comparar diferentes casas de cambio y bancos</li>
              <li>Evitar comisiones ocultas excesivas</li>
              <li>Elegir el mejor momento para realizar la conversión</li>
              <li>Negociar mejores tipos de cambio</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
              <p className="text-gray-800">
                <strong>💡 Tip:</strong> Las casas de cambio en aeropuertos suelen ofrecer las peores tasas. 
                Usa nuestra herramienta para calcular cuánto deberías recibir realmente y compara antes de cambiar.
              </p>
            </div>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
              🌟 Preguntas Frecuentes
            </h3>
            <p className="text-gray-700 mb-6">
              Encuentra respuestas a las dudas más comunes en nuestra sección de FAQ más abajo, 
              incluyendo información sobre tasas de cambio, comisiones, y cómo obtener el mejor precio al convertir dinero.
            </p>
          </article>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12">
        <FAQSection />
      </section>

      {/* AdSense Slot 3 */}
      <section className="container mx-auto px-4 py-6">
        <AdSenseSlot slot="bottom" />
      </section>

      {/* Blog Preview */}
      <section className="container mx-auto px-4 py-12">
        <BlogSection />
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
              <h4 className="font-bold text-lg mb-4">Conversiones Populares</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/euro-a-dolar" className="text-gray-400 hover:text-white">Euro a Dólar</Link></li>
                <li><Link to="/dolar-a-peso-mexicano" className="text-gray-400 hover:text-white">USD a MXN</Link></li>
                <li><Link to="/dolar-a-peso-argentino" className="text-gray-400 hover:text-white">USD a ARS</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/blog" className="text-gray-400 hover:text-white">Blog</Link></li>
                <li><a href="#faq" className="text-gray-400 hover:text-white">Preguntas Frecuentes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/privacidad" className="text-gray-400 hover:text-white">Política de Privacidad</a></li>
                <li><a href="/terminos" className="text-gray-400 hover:text-white">Términos de Uso</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2025 ConvertidorDivisas.es - Todos los derechos reservados</p>
            <p className="mt-2">Tasas de cambio actualizadas mediante Exchange Rate API</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ConversionCard({ from, to, title, description, link }) {
  return (
    <Link to={link} className="block">
      <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-indigo-600">{from}</span>
          <span className="text-gray-400">→</span>
          <span className="text-2xl font-bold text-purple-600">{to}</span>
        </div>
        <h3 className="font-bold text-lg text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
        <div className="mt-4 text-indigo-600 font-semibold text-sm">
          Ver conversión →
        </div>
      </div>
    </Link>
  );
}

function ConversionPage({ from, to }) {
  return (
    <div className="min-h-screen">
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <nav className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">💱</span>
            <span className="text-white font-bold text-xl">ConvertidorDivisas.es</span>
          </Link>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-12">
        <nav className="text-sm text-white/80 mb-4">
          <Link to="/" className="hover:text-white">Inicio</Link> &gt; <span>{from} a {to}</span>
        </nav>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Conversor {from} a {to}
        </h1>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl mx-auto mb-8">
          <CurrencyConverter defaultFrom={from} defaultTo={to} />
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto">
          <HistoricalChart from={from} to={to} />
        </div>
      </section>
    </div>
  );
}

function BlogPage() {
  return (
    <div className="min-h-screen">
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <nav className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">💱</span>
            <span className="text-white font-bold text-xl">ConvertidorDivisas.es</span>
          </Link>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center">
          📚 Blog de Finanzas y Divisas
        </h1>
        <BlogSection fullPage={true} />
      </section>
    </div>
  );
}

function BlogPost() {
  const { slug } = useParams();
  const post = blogPostsData[slug];

  // Redirect to blog page if post not found
  if (!post) {
    return (
      <div className="min-h-screen">
        <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
          <nav className="container mx-auto px-4 py-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-3xl">💱</span>
              <span className="text-white font-bold text-xl">ConvertidorDivisas.es</span>
            </Link>
          </nav>
        </header>
        <section className="container mx-auto px-4 py-12 text-center">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Artículo no encontrado</h1>
            <p className="text-gray-600 mb-6">Lo sentimos, el artículo que buscas no existe.</p>
            <Link to="/blog" className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition">
              Volver al Blog
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <nav className="container mx-auto px-4 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">💱</span>
            <span className="text-white font-bold text-xl">ConvertidorDivisas.es</span>
          </Link>
        </nav>
      </header>

      <section className="container mx-auto px-4 py-12">
        <nav className="text-sm text-white/80 mb-4 max-w-4xl mx-auto">
          <Link to="/" className="hover:text-white">Inicio</Link> &gt; <Link to="/blog" className="hover:text-white">Blog</Link> &gt; <span>{post.title}</span>
        </nav>
        
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-indigo-100 text-indigo-700 text-sm font-semibold rounded-full">
                {post.category}
              </span>
              <span className="text-gray-500 text-sm">{post.readTime} lectura</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-600 text-sm">
              <span>Por {post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
          </header>

          {/* AdSense Block at the beginning */}
          <div className="my-8">
            <AdSenseSlot slot="top" />
          </div>

          {/* Article Content */}
          <article 
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* AdSense Block at the end */}
          <div className="my-8">
            <AdSenseSlot slot="bottom" />
          </div>

          {/* Related Articles */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Artículos Relacionados</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.values(blogPostsData)
                .filter(p => p.slug !== slug)
                .slice(0, 2)
                .map((relatedPost) => (
                  <Link
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`}
                    className="block p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                  >
                    <h4 className="font-bold text-gray-800 mb-2">{relatedPost.title}</h4>
                    <p className="text-gray-600 text-sm">{relatedPost.excerpt}</p>
                  </Link>
                ))}
            </div>
          </div>

          {/* Back to Blog */}
          <div className="mt-8 text-center">
            <Link 
              to="/blog" 
              className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-full font-bold hover:bg-indigo-700 transition"
            >
              ← Volver al Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Schema.org BlogPosting markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "description": post.excerpt,
          "image": post.image,
          "datePublished": post.date,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "ConvertidorDivisas.es",
            "logo": {
              "@type": "ImageObject",
              "url": "https://convertidordivisas.es/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://convertidordivisas.es/blog/${post.slug}`
          }
        })}
      </script>
    </div>
  );
}

export default App;
