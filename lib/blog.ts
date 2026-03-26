import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { cloudflareImages } from './images';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

// Tipos para el blog
export interface BlogPost {
  slug: string;
  title: string;
  seoTitle?: string;
  date: string;
  description: string;
  author?: string;
  keywords?: string[];
  tags?: string[];
  category?: string;
  /** Imagen hero del artículo servida desde /public (ej. /blog/foo-hero.png) */
  heroImage?: string;
  /** Miniatura para cards del listado y Open Graph (ej. /blog/foo-thumb.png) */
  cardImage?: string;
  imageId?: string;
  heroGradient?: boolean;
  faqSchema?: Array<{
    question: string;
    answer: string;
  }>;
  content: string;
}

// Configuración de paginación
export const POSTS_PER_PAGE = 6;

const postsDirectory = path.join(process.cwd(), 'docs/blog_posts');

// Obtener todos los slugs de los posts
export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

// Obtener datos de un post específico por slug
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Usar gray-matter para parsear la sección de metadatos
  const { data, content: markdownContent } = matter(fileContents);
  
  // Procesar el contenido Markdown a HTML (con soporte para tablas GFM)
  const processedContent = await remark()
    .use(remarkGfm) // Soporte para GitHub Flavored Markdown (tablas, strikethrough, etc)
    .use(html, { sanitize: false }) // sanitize: false para permitir HTML en markdown
    .process(markdownContent);
  const contentHtml = processedContent.toString();
  
  const isValidCloudflareId = (id: string) =>
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id);

  const rawImageId = data.imageId;
  const cardImage =
    typeof data.cardImage === 'string' ? data.cardImage.trim() : undefined;
  const heroImage =
    typeof data.heroImage === 'string' ? data.heroImage.trim() : undefined;
  const hasLocalCard = Boolean(cardImage?.startsWith('/'));

  const imageId =
    rawImageId && isValidCloudflareId(rawImageId)
      ? rawImageId
      : hasLocalCard
        ? undefined
        : cloudflareImages.sections.services;

  return {
    slug,
    title: data.title || '',
    seoTitle: data.seoTitle || undefined,
    date: data.date || '',
    description: data.description || '',
    author: data.author || undefined,
    keywords: data.keywords || undefined,
    tags: data.tags || [],
    category: data.category || 'General',
    heroImage: heroImage?.startsWith('/') ? heroImage : undefined,
    cardImage: hasLocalCard ? cardImage : undefined,
    imageId,
    heroGradient: data.heroGradient || false,
    faqSchema: data.faqSchema || [],
    content: contentHtml,
  };
}

// Obtener todos los posts ordenados por fecha
export async function getAllPosts(): Promise<BlogPost[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      return await getPostBySlug(slug);
    })
  );
  
  // Ordenar posts por fecha, del más reciente al más antiguo
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// Obtener posts paginados
export async function getPaginatedPosts(page: number = 1): Promise<{
  posts: BlogPost[];
  totalPages: number;
}> {
  const allPosts = await getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  
  // Asegurar que la página está dentro de los límites válidos
  const validPage = Math.max(1, Math.min(page, totalPages));
  
  // Calcular el índice de inicio y fin para la paginación
  const startIndex = (validPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  
  // Obtener los posts para la página actual
  const posts = allPosts.slice(startIndex, endIndex);
  
  return {
    posts,
    totalPages,
  };
}

// Obtener todas las etiquetas únicas
export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const allTags = posts.flatMap(post => post.tags || []);
  const uniqueTags = Array.from(new Set(allTags));
  return uniqueTags;
}

// Obtener posts paginados por etiqueta
export async function getPostsByTag(tag: string, page: number = 1): Promise<{
  posts: BlogPost[];
  totalPages: number;
  totalPosts: number;
}> {
  const allPosts = await getAllPosts();
  
  // Filtrar posts por etiqueta
  const filteredPosts = allPosts.filter(post => 
    post.tags?.includes(tag)
  );
  
  const totalPosts = filteredPosts.length;
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);
  
  // Asegurar que la página está dentro de los límites válidos
  const validPage = Math.max(1, Math.min(page, totalPages || 1));
  
  // Calcular el índice de inicio y fin para la paginación
  const startIndex = (validPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  
  // Obtener los posts para la página actual
  const posts = filteredPosts.slice(startIndex, endIndex);
  
  return {
    posts,
    totalPages,
    totalPosts
  };
} 
