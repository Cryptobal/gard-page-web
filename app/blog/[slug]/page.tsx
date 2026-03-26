import { Metadata } from 'next';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import BlogPost from '@/app/components/blog/BlogPost';
import { notFound } from 'next/navigation';
import { getBlogPostShareImageUrl } from '@/lib/blog-og-image';

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

  const ogImageUrl = getBlogPostShareImageUrl(post.cardImage, post.imageId);
  const ogWidth = post.cardImage ? 800 : 1200;
  const ogHeight = post.cardImage ? 450 : 630;

  const metaTitle = post.seoTitle || post.title;

  return {
    title: metaTitle,
    description: post.description,
    keywords: post.keywords || post.tags || ['seguridad privada', 'blog gard', 'guardias de seguridad'],
    authors: [{ name: post.author || 'Gard Security', url: 'https://www.gard.cl' }],
    robots: 'index, follow',
    alternates: {
      canonical: `https://www.gard.cl/blog/${slug}`,
    },
    openGraph: {
      title: metaTitle,
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
          width: ogWidth,
          height: ogHeight,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
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
