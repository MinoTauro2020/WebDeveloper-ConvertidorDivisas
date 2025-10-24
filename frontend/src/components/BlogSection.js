import React from 'react';
import { Link } from 'react-router-dom';
import blogPostsData from '../data/blogPosts';

const BlogSection = ({ fullPage = false }) => {
  const blogPosts = Object.values(blogPostsData);

  const displayPosts = fullPage ? blogPosts : blogPosts.slice(0, 3);

  return (
    <div className={fullPage ? 'max-w-6xl mx-auto' : 'max-w-5xl mx-auto'} data-testid="blog-section">
      {!fullPage && (
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            📝 Blog de Finanzas y Divisas
          </h2>
          <p className="text-white/90 text-lg">
            Artículos, guías y consejos para aprovechar mejor tus conversiones de moneda
          </p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayPosts.map((post, index) => (
          <Link 
            key={post.slug} 
            to={`/blog/${post.slug}`}
            className="block"
            data-testid={`blog-post-${index}`}
          >
            <article className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                    {post.category}
                  </span>
                  <span className="text-gray-500 text-sm">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <span className="text-indigo-600 font-semibold text-sm hover:text-indigo-700">
                    Leer más →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>

      {!fullPage && (
        <div className="text-center mt-8">
          <Link 
            to="/blog" 
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition shadow-lg"
            data-testid="view-all-posts"
          >
            Ver todos los artículos 👉
          </Link>
        </div>
      )}

      {/* Schema.org Blog markup */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Blog de ConvertidorDivisas.es",
          "description": "Artículos y guías sobre conversión de divisas, finanzas personales y ahorro",
          "url": "https://convertidordivisas.es/blog",
          "blogPost": blogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "url": `https://convertidordivisas.es/blog/${post.slug}`
          }))
        })}
      </script>
    </div>
  );
};

export default BlogSection;