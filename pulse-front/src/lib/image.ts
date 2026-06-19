const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export function formatImageUrl(imageUrl: string | null | undefined): string {
  if (!imageUrl) {
    return 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80';
  }
  
  // Si c'est déjà une URL complète (http ou https)
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  
  // Si c'est une URL relative (ex: /uploads/...)
  if (imageUrl.startsWith('/')) {
    return `${API_BASE_URL}${imageUrl}`;
  }
  
  // Sinon, ajoute le slash
  return `${API_BASE_URL}/${imageUrl}`;
}
