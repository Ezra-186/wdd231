import { UNSPLASH_API_URL, UNSPLASH_CLIENT_ID } from './config.mjs';

export async function fetchPhotos(keyword) {
    const url = `${UNSPLASH_API_URL}?query=${encodeURIComponent(keyword)}&per_page=10&client_id=${UNSPLASH_CLIENT_ID}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch photos');
    const { results } = await res.json();
    return results;
}