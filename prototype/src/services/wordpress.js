const WORDPRESS_API_BASE =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_WORDPRESS_API_URL) ||
  (typeof process !== 'undefined' && process.env && process.env.VITE_WORDPRESS_API_URL) ||
  'https://public-api.wordpress.com/rest/v1.1/sites/savygreencms.wordpress.com';

/**
 * Strips HTML tags and decodes common HTML entities for plain text display.
 */
export function stripHtml(html = '') {
  if (!html) return '';
  // Remove HTML tags
  let text = html.replace(/<[^>]*>/g, '').trim();
  // Decode common HTML entities
  const entities = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&#8217;': "'",
    '&#8216;': "'",
    '&#8220;': '"',
    '&#8221;': '"',
    '&#8211;': '–',
    '&#8212;': '—',
    '&hellip;': '...',
    '&nbsp;': ' ',
  };
  for (const [key, value] of Object.entries(entities)) {
    text = text.replaceAll(key, value);
  }
  // Decimal entity decode fallback (e.g., &#8230;)
  text = text.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
  return text.trim();
}

/**
 * Formats WordPress ISO date string into human readable format (e.g. "February 2026" or "23 Sep 2026").
 */
export function formatBlogDate(dateStr) {
  if (!dateStr) return 'Recent';
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch {
    return dateStr;
  }
}

/**
 * Calculates estimated reading time based on word count.
 */
export function calculateReadTime(content = '') {
  const clean = stripHtml(content);
  const words = clean.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} min read`;
}

/**
 * Extracts the primary category name from WordPress categories object or terms.
 */
export function extractCategory(post) {
  if (post.categories) {
    const values = Object.values(post.categories);
    if (values.length > 0 && values[0]?.name) {
      return values[0].name;
    }
  }
  if (post.terms?.category) {
    const terms = Object.values(post.terms.category);
    if (terms.length > 0 && terms[0]?.name) {
      return terms[0].name;
    }
  }
  return 'Electric Mobility';
}

/**
 * Maps a raw WordPress REST API post to the clean standardized structure.
 */
export function mapWordPressPost(post) {
  const fallbackImage = '/assets/dump-truck.jpg';
  const cleanTitle = stripHtml(post.title || '');
  const cleanExcerpt = stripHtml(post.excerpt || '');
  const image =
    post.featured_image ||
    post.post_thumbnail?.URL ||
    post.attachments?.[Object.keys(post.attachments || {})[0]]?.URL ||
    fallbackImage;

  return {
    id: post.ID,
    slug: post.slug,
    title: cleanTitle,
    rawTitle: post.title || '',
    category: extractCategory(post),
    date: formatBlogDate(post.date),
    isoDate: post.date,
    author: post.author?.name || 'SAVY Engineering Team',
    readTime: calculateReadTime(post.content || post.excerpt || ''),
    image,
    excerpt: cleanExcerpt,
    content: post.content || '',
    status: post.status || 'publish',
  };
}

/**
 * Fetches all published posts from the WordPress REST API endpoint.
 */
export async function fetchPublishedPosts(number = 10) {
  const url = `${WORDPRESS_API_BASE}/posts/?number=${number}&status=publish`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    if (!data.posts || !Array.isArray(data.posts)) {
      return [];
    }
    return data.posts
      .filter((post) => post.status === 'publish')
      .map(mapWordPressPost);
  } catch (error) {
    console.error('Failed to fetch WordPress posts:', error);
    throw error;
  }
}

/**
 * Fetches an individual post by slug from the WordPress REST API endpoint.
 */
export async function fetchPostBySlug(slug) {
  if (!slug) return null;
  const url = `${WORDPRESS_API_BASE}/posts/slug:${encodeURIComponent(slug)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
    }
    const post = await res.json();
    if (!post || post.error || post.status !== 'publish') {
      return null;
    }
    return mapWordPressPost(post);
  } catch (error) {
    console.error(`Failed to fetch WordPress post with slug "${slug}":`, error);
    throw error;
  }
}
