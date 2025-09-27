/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimización de imágenes
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400, // 24 horas
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Optimización de compresión
  compress: true,
  
  // Optimización de webpack
  webpack: (config, { dev, isServer }) => {
    // Configuración para videos
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    // Optimización para producción
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },

  // Optimización de experimental features (deshabilitado optimizeCss)
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // COMENTADO PARA SOLUCIONAR PROBLEMA DE GOOGLE ADS - las URLs del feed no tienen trailing slash
  // trailingSlash: true,
  
  // Redirecciones para evitar errores 404 y contenido duplicado
  async redirects() {
    return [
      // Redirecciones básicas solamente
      {
        source: '/tecnologias',
        destination: '/tecnologia-seguridad',
        permanent: true,
      },
      {
        source: '/contactanos',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/mejor-empresa-de-seguridad',
        destination: '/sobre-nosotros',
        permanent: true,
      },
      
      // Redirecciones de URLs antiguas manteniendo la estructura ciudad/servicio
      {
        source: '/automatizacion-y-domotica',
        destination: '/servicios/automatizacion-y-domotica',
        permanent: true,
      },
      {
        source: '/drones-de-seguridad-para-empresas-e-industrias',
        destination: '/servicios/drones-seguridad',
        permanent: true,
      },
      {
        source: '/guardias-de-seguridad-privada-para-empresas',
        destination: '/servicios/guardias-de-seguridad',
        permanent: true,
      },
      {
        source: '/noticias-de-seguridad-privada',
        destination: '/blog',
        permanent: true,
      },
      
      // Redireccionar parámetros UTM y tracking a URLs limpias
      {
        source: '/:path*\\?trk=:trk*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/:path*\\?elementor_library=:elem*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/:path*\\?jkit-ajax-request=:jkit*',
        destination: '/:path*',
        permanent: true,
      },
    ];
  },
  
  // Headers optimizados para rendimiento y seguridad
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // SEO
          { key: 'X-Robots-Tag', value: 'index, follow' },
          
          // Seguridad
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          
          // Content Security Policy
          { 
            key: 'Content-Security-Policy', 
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://salesiq.zohopublic.com https://js.zohocdn.com https://maps.googleapis.com https://maps.gstatic.com https://iframe.cloudflarestream.com https://embed.cloudflarestream.com https://va.vercel-scripts.com https://static.hotjar.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://maps.googleapis.com https://css.zohocdn.com",
              "font-src 'self' https://fonts.gstatic.com https://maps.gstatic.com https://css.zohocdn.com",
              "img-src 'self' data: https: blob: https://imagedelivery.net https://iframe.cloudflarestream.com https://maps.googleapis.com https://maps.gstatic.com",
              "media-src 'self' https://iframe.cloudflarestream.com",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://salesiq.zohopublic.com https://hook.us1.make.com https://maps.googleapis.com https://iframe.cloudflarestream.com https://embed.cloudflarestream.com https://videodelivery.net https://www.google.com https://googleads.g.doubleclick.net https://www.googleadservices.com",
              "frame-src 'self' https://www.googletagmanager.com https://salesiq.zohopublic.com https://iframe.cloudflarestream.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests"
            ].join('; ')
          },
          
          // Rendimiento
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Cache-Control', value: 'public, max-age=3600, s-maxage=3600' },
        ]
      },
      {
        source: '/sitemap.xml',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400' },
        ]
      },
      {
        source: '/robots.txt',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, s-maxage=86400' },
        ]
      }
    ];
  }
};

module.exports = nextConfig; 