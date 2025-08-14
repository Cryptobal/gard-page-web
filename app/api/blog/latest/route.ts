import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/blog';

export async function GET(request: Request) {
  try {
    // Obtener los posts (sin usar request.url para evitar dynamic server usage)
    const allPosts = await getAllPosts();
    const limitedPosts = allPosts.slice(0, 3); // Default limit de 3
    
    // Devolver los posts como respuesta JSON
    return NextResponse.json({ posts: limitedPosts });
  } catch (error) {
    console.error('Error en la API de blog:', error);
    return NextResponse.json(
      { error: 'Error al obtener los posts del blog' },
      { status: 500 }
    );
  }
} 