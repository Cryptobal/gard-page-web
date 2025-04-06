import { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import BlogPost from '@/app/components/blog/BlogPost';
import { CLOUDFLARE_ACCOUNT_HASH } from '@/lib/images';
import { notFound } from 'next/navigation';

// Generar rutas estáticas para todos los posts
export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

// Generar metadata dinámica para cada post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Artículo no encontrado | Blog Gard Security',
      description: 'El artículo solicitado no está disponible o fue eliminado.',
      robots: 'noindex, nofollow',
    };
  }

  // Limitar el título a 60 caracteres para SEO
  let shortTitle = post.title;
  if (post.title.length > 60) {
    shortTitle = post.title.substring(0, 57) + '...';
  }

  const ogImageUrl = post.imageId 
    ? `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${post.imageId}/public`
    : `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/5eea1064-8a2d-4e8b-5606-d28775467a00/public`;

  return {
    title: `${shortTitle} | Blog Gard Security`,
    description: post.description,
    keywords: post.tags || ['seguridad privada', 'blog gard', 'guardias de seguridad'],
    authors: [{ name: 'Gard Security', url: 'https://gard.cl' }],
    robots: 'index, follow',
    openGraph: {
      title: shortTitle, // Utilizamos el título acortado también para Open Graph
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      url: `https://gard.cl/blog/${slug}`,
      siteName: 'Gard Security',
      locale: 'es_CL',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: shortTitle, // Usamos el título acortado para el alt de la imagen
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: shortTitle, // Título acortado para Twitter también
      description: post.description,
      images: [ogImageUrl],
    }
  };
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  // Verificar que tengamos un slug válido
  if (!params.slug) {
    return notFound();
  }
  
  console.log('Rendering BlogPostPage with slug:', params.slug);
  
  return <BlogPost slug={params.slug} />;
} 