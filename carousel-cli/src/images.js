/**
 * Image search — Unsplash (primary) + Pexels (fallback)
 * Returns a URL suitable for embedding in carousel slides
 */

async function searchUnsplash(query) {
  const key = process.env.UNSPLASH_ACCESS_KEY;
  if (!key) return null;

  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=squarish`;

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${key}` }
  });

  if (!res.ok) return null;

  const data = await res.json();
  if (data.results && data.results.length > 0) {
    // Use regular size (1080w) for carousel
    return data.results[0].urls.regular;
  }

  return null;
}

async function searchPexels(query) {
  const key = process.env.PEXELS_API_KEY;
  if (!key) return null;

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=square`;

  const res = await fetch(url, {
    headers: { Authorization: key }
  });

  if (!res.ok) return null;

  const data = await res.json();
  if (data.photos && data.photos.length > 0) {
    return data.photos[0].src.large;
  }

  return null;
}

/**
 * Search for an image by query. Tries Unsplash first, falls back to Pexels.
 * @param {string} query - Search terms
 * @returns {string|null} Image URL or null
 */
export async function searchImages(query) {
  // Try Unsplash first
  const unsplashUrl = await searchUnsplash(query);
  if (unsplashUrl) return unsplashUrl;

  // Fallback to Pexels
  const pexelsUrl = await searchPexels(query);
  if (pexelsUrl) return pexelsUrl;

  return null;
}
