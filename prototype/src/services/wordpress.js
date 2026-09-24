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
 * Formats WordPress ISO date string into human readable format (e.g. "23 September 2026").
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
 * Checks if a WordPress post belongs to the 'Careers' category.
 * Inspects both `post.categories` and `post.terms.category` for slug or name match.
 */
export function isCareerPost(post) {
  if (!post) return false;

  if (post.categories) {
    const cats = Object.values(post.categories);
    if (
      cats.some(
        (c) =>
          c?.slug?.toLowerCase() === 'careers' ||
          c?.name?.toLowerCase() === 'careers'
      )
    ) {
      return true;
    }
  }

  if (post.terms?.category) {
    const terms = Object.values(post.terms.category);
    if (
      terms.some(
        (c) =>
          c?.slug?.toLowerCase() === 'careers' ||
          c?.name?.toLowerCase() === 'careers'
      )
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Extracts the primary category name for Blog posts (guaranteed NOT to be 'Careers').
 */
export function extractBlogCategory(post) {
  let catList = [];
  if (post.categories) {
    catList = Object.values(post.categories);
  } else if (post.terms?.category) {
    catList = Object.values(post.terms.category);
  }

  const nonCareer = catList.find(
    (c) =>
      c?.slug?.toLowerCase() !== 'careers' &&
      c?.name?.toLowerCase() !== 'careers'
  );

  return nonCareer?.name || 'Electric Mobility';
}

/**
 * Extracts the Department for a Career post (any category other than 'Careers').
 * NEVER returns 'Careers' as the department badge.
 */
export function extractCareerDepartment(post) {
  let catList = [];
  if (post.categories) {
    catList = Object.values(post.categories);
  } else if (post.terms?.category) {
    catList = Object.values(post.terms.category);
  }

  const nonCareer = catList.find(
    (c) =>
      c?.slug?.toLowerCase() !== 'careers' &&
      c?.name?.toLowerCase() !== 'careers'
  );

  return nonCareer?.name || 'Engineering & Operations';
}

/**
 * Extracts Career metadata (Location, Experience, Employment Type) from WordPress post tags.
 */
export function extractCareerTags(post) {
  let tagList = [];
  if (post.tags) {
    tagList = Object.values(post.tags).map((t) => t?.name || t);
  } else if (post.terms?.post_tag) {
    tagList = Object.values(post.terms.post_tag).map((t) => t?.name || t);
  }

  let location = '';
  let experience = '';
  let type = '';

  const remaining = [];

  tagList.forEach((tag) => {
    const raw = stripHtml(typeof tag === 'string' ? tag : tag?.name || '').trim();
    if (!raw) return;
    const lower = raw.toLowerCase();

    // 1. Experience detection (e.g., '2 -4 Years', '3–6 Years', '5+ Years', 'Fresher', '1-3 Yrs')
    if (
      !experience &&
      (/(\d+\s*[-–+to]+\s*\d*|\d+\+?)\s*(year|yr|month|exp)/i.test(lower) ||
        lower.includes('experience') ||
        lower.includes('fresher'))
    ) {
      experience = raw;
      return;
    }

    // 2. Employment Type detection (e.g., 'Full time', 'Full-Time', 'Part-Time', 'Contract', 'Internship', 'Remote', 'Hybrid')
    if (
      !type &&
      (lower.includes('full') ||
        lower.includes('part') ||
        lower.includes('contract') ||
        lower.includes('intern') ||
        lower.includes('remote') ||
        lower.includes('time') ||
        lower.includes('hybrid'))
    ) {
      type = raw;
      return;
    }

    // 3. Location candidate
    remaining.push(raw);
  });

  // Assign remaining tags
  if (remaining.length > 0 && !location) {
    location = remaining.shift();
  }
  if (remaining.length > 0 && !experience) {
    experience = remaining.shift();
  }
  if (remaining.length > 0 && !type) {
    type = remaining.shift();
  }

  return {
    location: location || '',
    experience: experience || '',
    type: type || '',
    allTags: tagList
  };
}

/**
 * Maps a raw WordPress post to a clean Blog structure.
 * Guaranteed to exclude Careers.
 */
export function mapWordPressBlogPost(post) {
  const fallbackImage = '/assets/dump-truck.jpg';
  const cleanTitle = stripHtml(post.title || '');
  const cleanExcerpt = stripHtml(post.excerpt || '');
  const image =
    post.featured_image ||
    post.post_thumbnail?.URL ||
    fallbackImage;

  return {
    id: post.ID || post.slug,
    slug: post.slug,
    title: cleanTitle,
    rawTitle: post.title || '',
    category: extractBlogCategory(post),
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
 * Maps a raw WordPress post to a clean Career/Job structure.
 */
export function mapWordPressCareerPost(post) {
  const cleanTitle = stripHtml(post.title || '');
  const cleanExcerpt = stripHtml(post.excerpt || '');
  const department = extractCareerDepartment(post);
  const meta = extractCareerTags(post);

  return {
    id: post.ID || post.slug,
    slug: post.slug,
    title: cleanTitle,
    rawTitle: post.title || '',
    department: department || 'Engineering & Operations',
    location: meta.location,
    experience: meta.experience,
    type: meta.type,
    description: cleanExcerpt || stripHtml(post.content || '').slice(0, 180) + '...',
    content: post.content || '',
    date: formatBlogDate(post.date),
    isoDate: post.date,
    status: post.status || 'publish',
  };
}

/**
 * Fetches published Blog posts ONLY (Careers posts are strictly excluded).
 */
export async function fetchPublishedPosts(number = 20) {
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

    // STRICT RULE: Only published actual posts, completely excluding any Career posts
    return data.posts
      .filter((post) => post.status === 'publish' && !isCareerPost(post))
      .map(mapWordPressBlogPost);
  } catch (error) {
    console.error('Failed to fetch WordPress blog posts:', error);
    throw error;
  }
}

/**
 * Fetches published Career posts ONLY (Blogs are strictly excluded).
 */
export async function fetchCareerPosts(number = 50) {
  // First attempt to query by category=careers for efficiency
  const url = `${WORDPRESS_API_BASE}/posts/?category=careers&number=${number}&status=publish`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    if (data.posts && Array.isArray(data.posts) && data.posts.length > 0) {
      return data.posts
        .filter((post) => post.status === 'publish' && isCareerPost(post))
        .map(mapWordPressCareerPost);
    }

    // Fallback: Fetch general published posts and filter by isCareerPost
    const fallbackRes = await fetch(`${WORDPRESS_API_BASE}/posts/?number=${number}&status=publish`);
    const fallbackData = await fallbackRes.json();
    if (!fallbackData.posts || !Array.isArray(fallbackData.posts)) {
      return [];
    }
    return fallbackData.posts
      .filter((post) => post.status === 'publish' && isCareerPost(post))
      .map(mapWordPressCareerPost);
  } catch (error) {
    console.error('Failed to fetch WordPress career posts:', error);
    throw error;
  }
}

/**
 * Fetches an individual Blog post by slug (returns null if it is a Career post).
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
    // If this slug belongs to a Career post, do not render it as a Blog!
    if (isCareerPost(post)) {
      return null;
    }
    return mapWordPressBlogPost(post);
  } catch (error) {
    console.error(`Failed to fetch WordPress blog post with slug "${slug}":`, error);
    throw error;
  }
}

/**
 * Fetches an individual Career post by slug (returns null if it is a standard Blog).
 */
export async function fetchCareerPostBySlug(slug) {
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
    // Must be a Career post
    if (!isCareerPost(post)) {
      return null;
    }
    return mapWordPressCareerPost(post);
  } catch (error) {
    console.error(`Failed to fetch WordPress career post with slug "${slug}":`, error);
    throw error;
  }
}
