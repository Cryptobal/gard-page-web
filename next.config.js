/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        pathname: '/**',
      },
    ],
  },
  // Agregar configuración para videos
  webpack: (config) => {
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
    return config;
  },
  trailingSlash: true,
  // Redirecciones para evitar errores 404 y contenido duplicado
  async redirects() {
    return [
      // Redirecciones básicas
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
      
      // Redireccionar de no-www a www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'gard.cl',
          },
        ],
        destination: 'https://www.gard.cl/:path*',
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
  
  // Agregar headers para mejorar SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig; 