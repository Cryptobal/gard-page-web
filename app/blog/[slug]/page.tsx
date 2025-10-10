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
// Next.js 15: params es ahora una Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
    return {} as Metadata;
  }

  const ogImageUrl = post.imageId 
    ? `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/${post.imageId}/public`
    : `https://imagedelivery.net/${CLOUDFLARE_ACCOUNT_HASH}/5eea1064-8a2d-4e8b-5606-d28775467a00/public`;

  // Acortar el título para evitar que exceda los 70 caracteres
  const shortenedTitle = post.title.length > 60 ? `${post.title.substring(0, 60)}...` : post.title;

  return {
    title: `${shortenedTitle} | Gard Security`,
    description: post.description,
    keywords: post.tags || ['seguridad privada', 'blog gard', 'guardias de seguridad'],
    authors: [{ name: 'Gard Security', url: 'https://gard.cl' }],
    robots: 'index, follow',
    alternates: {
      canonical: `https://www.gard.cl/blog/${slug}`,
    },
    openGraph: {
      title: post.title, // Mantenemos el título completo para Open Graph
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
      url: `https://www.gard.cl/blog/${slug}`,
      siteName: 'Gard Security',
      locale: 'es_CL',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: shortenedTitle, // Acortamos también para Twitter
      description: post.description,
      images: [ogImageUrl],
    }
  };
}

// Next.js 15: params es ahora una Promise
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  // Verificar que tengamos un slug válido
  if (!resolvedParams.slug) {
    return notFound();
  }
  
  console.log('Rendering BlogPostPage with slug:', resolvedParams.slug);
  
  return <BlogPost slug={resolvedParams.slug} />;
} 