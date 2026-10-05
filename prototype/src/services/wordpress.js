const DEFAULT_API_BASE = 'https://savygreen.upwardsonwards.io/wp-json/wp/v2';

let cachedCategories = null;
let cachedCategoriesPromise = null;

/**
 * Returns the sanitized WordPress REST API Base URL.
 */
export function getWordpressApiBase() {
  let base =
    (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_WORDPRESS_API_URL) ||
    (typeof process !== 'undefined' && process.env && process.env.VITE_WORDPRESS_API_URL) ||
    DEFAULT_API_BASE;

  base = base.trim().replace(/\/+$/, '');
  if (base.endsWith('/posts')) {
    base = base.slice(0, -6);
  }
  return base;
}

/**
 * Strips HTML tags and decodes common HTML entities for plain text display.
 */
export function stripHtml(html = '') {
  if (html == null) return '';
  if (typeof html !== 'string') {
    if (typeof html === 'object' && html.rendered) {
      return stripHtml(html.rendered);
    }
    return String(html);
  }
  let text = html.replace(/<[^>]*>/g, '').trim();
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
      day: 'numeric',
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
 * Extracts term objects (categories and tags) from embedded WP post response.
 */
export function getPostTerms(post) {
  if (!post) return [];
  const terms = [];
  if (post._embedded && post._embedded['wp:term']) {
    for (const group of post._embedded['wp:term']) {
      if (Array.isArray(group)) {
        for (const t of group) {
          if (t && t.name) {
            terms.push({
              id: t.id,
              name: stripHtml(t.name),
              slug: (t.slug || '').toLowerCase(),
              taxonomy: t.taxonomy || 'category',
            });
          }
        }
      }
    }
  }

  if (post.categories && Array.isArray(post.categories)) {
    post.categories.forEach((c) => {
      if (typeof c === 'object' && c?.name) {
        terms.push({
          id: c.id,
          name: stripHtml(c.name),
          slug: (c.slug || '').toLowerCase(),
          taxonomy: 'category',
        });
      }
    });
  }
  return terms;
}

/**
 * Extracts featured image from embedded media or fallback.
 */
export function extractFeaturedImage(post, fallback = '/assets/classic-golf.jpeg') {
  if (!post) return fallback;
  if (post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'].length > 0) {
    const fm = post._embedded['wp:featuredmedia'][0];
    if (fm.source_url) return fm.source_url;
    if (fm.media_details?.sizes?.large?.source_url) return fm.media_details.sizes.large.source_url;
    if (fm.media_details?.sizes?.full?.source_url) return fm.media_details.sizes.full.source_url;
  }
  if (post.featured_media_src_url) return post.featured_media_src_url;
  if (post.featured_image) return post.featured_image;
  return fallback;
}

/**
 * Fetches all categories from the CMS (cached).
 */
export async function fetchAllCategories() {
  if (cachedCategories) return cachedCategories;
  if (cachedCategoriesPromise) return cachedCategoriesPromise;

  cachedCategoriesPromise = (async () => {
    try {
      const base = getWordpressApiBase();
      const res = await fetch(`${base}/categories?per_page=100`);
      if (res.ok) {
        const cats = await res.json();
        if (Array.isArray(cats)) {
          cachedCategories = cats;
          return cats;
        }
      }
    } catch (e) {
      console.warn('Could not fetch WordPress categories:', e);
    }
    return [];
  })();

  const result = await cachedCategoriesPromise;
  cachedCategoriesPromise = null;
  return result;
}

/**
 * Helper to get categorized category IDs.
 */
export async function getCategoryClassification() {
  const cats = await fetchAllCategories();
  const careerIds = [];
  const mediaIds = [];

  cats.forEach((c) => {
    const slug = (c.slug || '').toLowerCase();
    const name = (c.name || '').toLowerCase();

    if (slug === 'careers' || name.includes('career') || name.includes('job')) {
      careerIds.push(c.id);
    } else if (
      ['news', 'media', 'industry-participation', 'press', 'exhibitions', 'awards-exhibitions'].includes(slug) ||
      name.includes('news') ||
      name.includes('media') ||
      name.includes('industry participation') ||
      name.includes('press')
    ) {
      mediaIds.push(c.id);
    }
  });

  return {
    careerIds,
    mediaIds,
    blogExcludeIds: [...careerIds, ...mediaIds],
  };
}

/**
 * Checks if a WordPress post is a Careers / Job post.
 */
export function isCareerPost(post) {
  if (!post) return false;
  const terms = getPostTerms(post);
  if (
    terms.some(
      (t) =>
        t.slug === 'careers' ||
        t.name.toLowerCase() === 'careers' ||
        t.taxonomy === 'job_listing'
    )
  ) {
    return true;
  }
  if (post.acf && (post.acf.job_type || post.acf.experience || post.acf.job_location)) {
    return true;
  }
  if (post.slug && post.slug.toLowerCase().startsWith('job-')) {
    return true;
  }
  return false;
}

/**
 * Checks if a WordPress post belongs to Media / News / Industry Participation.
 */
export function isMediaPost(post) {
  if (!post) return false;
  const terms = getPostTerms(post);
  const mediaSlugs = ['news', 'media', 'industry-participation', 'press', 'press-release', 'awards-exhibitions', 'exhibitions'];
  if (
    terms.some(
      (t) =>
        mediaSlugs.includes(t.slug) ||
        mediaSlugs.some((s) => t.name.toLowerCase().includes(s))
    )
  ) {
    return true;
  }
  if (
    post.acf &&
    (post.acf.news_name ||
      post.acf['participation_in_:'] ||
      post.acf.article_link ||
      post.acf.publication)
  ) {
    return true;
  }
  return false;
}

/**
 * Checks if a post is a standard Blog post.
 */
export function isBlogPost(post) {
  if (!post) return false;
  return !isCareerPost(post) && !isMediaPost(post);
}

/**
 * Extracts Blog category name from terms.
 */
export function extractBlogCategory(post) {
  const terms = getPostTerms(post).filter((t) => t.taxonomy === 'category');
  const nonGeneral = terms.find(
    (t) =>
      t.slug !== 'careers' &&
      t.slug !== 'blog' &&
      t.slug !== 'uncategorized' &&
      !['news', 'media', 'industry-participation', 'press'].includes(t.slug)
  );
  if (nonGeneral) {
    return nonGeneral.name;
  }
  const anyCat = terms.find((t) => t.slug !== 'careers' && t.slug !== 'uncategorized');
  if (anyCat) {
    return anyCat.name;
  }
  return 'Electric Mobility';
}

/**
 * Extracts Department for Career posts.
 */
export function extractCareerDepartment(post) {
  if (post.acf && post.acf.department) {
    return stripHtml(post.acf.department);
  }
  const terms = getPostTerms(post).filter((t) => t.taxonomy === 'category');
  const nonCareer = terms.find((t) => t.slug !== 'careers');
  return nonCareer?.name || 'Engineering & Operations';
}

/**
 * Extracts Career metadata (Location, Experience, Employment Type).
 */
export function extractCareerTags(post) {
  const terms = getPostTerms(post).filter((t) => t.taxonomy === 'post_tag');
  const tagList = terms.map((t) => t.name);

  let location = (post.acf && post.acf.location) || '';
  let experience = (post.acf && post.acf.experience) || '';
  let type = (post.acf && (post.acf.job_type || post.acf.employment_type)) || '';

  const remaining = [];

  tagList.forEach((tag) => {
    const raw = stripHtml(tag).trim();
    if (!raw) return;
    const lower = raw.toLowerCase();

    if (
      !experience &&
      (/(\d+\s*[-–+to]+\s*\d*|\d+\+?)\s*(year|yr|month|exp)/i.test(lower) ||
        lower.includes('experience') ||
        lower.includes('fresher'))
    ) {
      experience = raw;
      return;
    }

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

    remaining.push(raw);
  });

  if (remaining.length > 0 && !location) location = remaining.shift();
  if (remaining.length > 0 && !experience) experience = remaining.shift();
  if (remaining.length > 0 && !type) type = remaining.shift();

  return {
    location: location || 'Pune, India',
    experience: experience || '2+ Years',
    type: type || 'Full Time',
    allTags: tagList,
  };
}

/**
 * Maps a raw WordPress post to a clean Blog structure.
 */
export function mapWordPressBlogPost(post) {
  const fallbackImage = '/assets/classic-golf.jpeg';
  const cleanTitle = stripHtml(post.title?.rendered || post.title || '');
  const cleanExcerpt = stripHtml(post.excerpt?.rendered || post.excerpt || '');
  const content = post.content?.rendered || (typeof post.content === 'string' ? post.content : '') || '';
  const image = extractFeaturedImage(post, fallbackImage);

  return {
    id: post.id || post.ID || post.slug,
    slug: post.slug,
    title: cleanTitle,
    rawTitle: post.title?.rendered || post.title || '',
    category: extractBlogCategory(post),
    date: formatBlogDate(post.date),
    isoDate: post.date,
    author: post._embedded?.author?.[0]?.name || post.author?.name || 'SAVY Engineering Team',
    readTime: calculateReadTime(content || cleanExcerpt),
    image,
    excerpt: cleanExcerpt,
    content,
    status: post.status || 'publish',
  };
}

/**
 * Maps a raw WordPress post to a clean Career/Job structure.
 */
export function mapWordPressCareerPost(post) {
  const cleanTitle = stripHtml(post.title?.rendered || post.title || '');
  const content = post.content?.rendered || (typeof post.content === 'string' ? post.content : '') || '';
  const cleanExcerpt = stripHtml(post.excerpt?.rendered || post.excerpt || '');
  const tagsMeta = extractCareerTags(post);

  return {
    id: post.id || post.ID || post.slug,
    slug: post.slug,
    title: cleanTitle,
    rawTitle: post.title?.rendered || post.title || '',
    department: extractCareerDepartment(post),
    location: (post.acf && post.acf.location) || tagsMeta.location,
    experience: (post.acf && post.acf.experience) || tagsMeta.experience,
    type: (post.acf && (post.acf.job_type || post.acf.employment_type)) || tagsMeta.type,
    description: cleanExcerpt || (content ? stripHtml(content).slice(0, 180) + '...' : 'Exciting career opportunity at SAVY Greentech.'),
    content,
    date: formatBlogDate(post.date),
    isoDate: post.date,
    status: post.status || 'publish',
  };
}

/**
 * Maps a raw WordPress post to a clean Media/News structure.
 */
export function mapWordPressMediaPost(post) {
  const cleanTitle = stripHtml(post.title?.rendered || post.title || '');
  const cleanExcerpt = stripHtml(post.excerpt?.rendered || post.excerpt || post.content?.rendered || '');
  const content = post.content?.rendered || (typeof post.content === 'string' ? post.content : '') || '';
  const image = extractFeaturedImage(post, '/assets/design-option-1.png');
  const terms = getPostTerms(post);

  const isEvent =
    Boolean(post.acf && post.acf['participation_in_:']) ||
    terms.some((t) => t.slug === 'industry-participation' || t.slug === 'exhibitions');

  const publication =
    (post.acf && (post.acf.news_name || post.acf.publication)) ||
    'SAVY Press Coverage';

  const href =
    (post.acf && (post.acf.article_link || post.acf.link)) ||
    post.link ||
    '#';

  const category =
    (post.acf && post.acf['participation_in_:']) ||
    (terms.find((t) => t.taxonomy === 'category' && t.slug !== 'uncategorized')?.name) ||
    (isEvent ? 'International Exhibition' : 'News & Coverage');

  const location = (post.acf && post.acf.location) || 'India';
  const year = (post.acf && post.acf.year) || (post.date ? new Date(post.date).getFullYear().toString() : '2026');
  const role = (post.acf && (post.acf['participation_in_:'] || post.acf.role)) || 'Exhibitor';
  const highlight = (post.acf && post.acf.highlight) || '';

  return {
    id: post.id || post.ID || post.slug,
    slug: post.slug,
    title: cleanTitle,
    copy: cleanExcerpt,
    content,
    image,
    publication,
    category,
    href,
    isEvent,
    location,
    year,
    role,
    highlight,
    date: formatBlogDate(post.date),
    isoDate: post.date,
    status: post.status || 'publish',
  };
}

/**
 * Core fetcher with pagination support for WordPress v2 REST API.
 */
export async function fetchWpPosts({
  page = 1,
  perPage = 10,
  search = '',
  categories = '',
  categoriesExclude = '',
  slug = '',
  status = 'publish',
} = {}) {
  const base = getWordpressApiBase();
  const params = new URLSearchParams();
  params.set('_embed', '1');
  if (status) params.set('status', status);
  if (page) params.set('page', String(page));
  if (perPage) params.set('per_page', String(perPage));
  if (search) params.set('search', search);
  if (categories) params.set('categories', String(categories));
  if (categoriesExclude) params.set('categories_exclude', String(categoriesExclude));
  if (slug) params.set('slug', slug);

  const url = `${base}/posts?${params.toString()}`;
  const res = await fetch(url);
  if (!res.ok) {
    if (res.status === 404) {
      return {
        rawPosts: [],
        totalPosts: 0,
        totalPages: 0,
        currentPage: page,
        perPage,
        hasNextPage: false,
        hasPrevPage: false,
      };
    }
    throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
  }

  const totalPostsHeader = res.headers.get('X-WP-Total') || res.headers.get('x-wp-total') || '0';
  const totalPagesHeader = res.headers.get('X-WP-TotalPages') || res.headers.get('x-wp-totalpages') || '1';

  const totalPosts = parseInt(totalPostsHeader, 10) || 0;
  const totalPages = parseInt(totalPagesHeader, 10) || (totalPosts > 0 ? Math.ceil(totalPosts / perPage) : 1);
  const data = await res.json();
  const rawPosts = Array.isArray(data) ? data : [];

  return {
    rawPosts,
    totalPosts,
    totalPages,
    currentPage: Number(page),
    perPage: Number(perPage),
    hasNextPage: Number(page) < totalPages,
    hasPrevPage: Number(page) > 1,
  };
}

/**
 * Fetches published Blog posts with pagination.
 * Supports both `fetchPublishedPosts(20)` (returns Array) and `fetchPublishedPosts({ page: 1, perPage: 10, search: '', category: '' })` (returns paginated object).
 */
export async function fetchPublishedPosts(options = 20) {
  const isNumber = typeof options === 'number';
  const { page = 1, perPage = isNumber ? options : 10, search = '', category = '' } = isNumber ? {} : options || {};

  try {
    const { blogExcludeIds } = await getCategoryClassification();
    const categoriesExclude = blogExcludeIds.length > 0 ? blogExcludeIds.join(',') : '';

    const result = await fetchWpPosts({
      page,
      perPage,
      search,
      categories: category || undefined,
      categoriesExclude,
    });

    const blogPosts = result.rawPosts
      .filter((p) => p.status === 'publish' && isBlogPost(p))
      .map(mapWordPressBlogPost);

    if (isNumber) {
      return blogPosts;
    }

    return {
      posts: blogPosts,
      totalPosts: result.totalPosts,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      perPage: result.perPage,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    };
  } catch (err) {
    console.error('Failed to fetch WordPress blog posts:', err);
    throw err;
  }
}

/**
 * Fetches published Career posts.
 */
export async function fetchCareerPosts(options = 50) {
  const isNumber = typeof options === 'number';
  const { page = 1, perPage = isNumber ? options : 50, search = '' } = isNumber ? {} : options || {};

  try {
    const { careerIds } = await getCategoryClassification();
    const categories = careerIds.length > 0 ? careerIds.join(',') : '';

    const result = await fetchWpPosts({
      page,
      perPage,
      search,
      categories: categories || undefined,
    });

    const careers = result.rawPosts
      .filter((p) => p.status === 'publish' && isCareerPost(p))
      .map(mapWordPressCareerPost);

    if (isNumber) {
      return careers;
    }

    return {
      posts: careers,
      totalPosts: result.totalPosts,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      perPage: result.perPage,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    };
  } catch (err) {
    console.error('Failed to fetch WordPress career posts:', err);
    throw err;
  }
}

/**
 * Fetches published Media, News, and Exhibition posts.
 */
export async function fetchMediaPosts(options = 50) {
  const isNumber = typeof options === 'number';
  const { page = 1, perPage = isNumber ? options : 50, search = '' } = isNumber ? {} : options || {};

  try {
    const { mediaIds } = await getCategoryClassification();
    const categories = mediaIds.length > 0 ? mediaIds.join(',') : '';

    const result = await fetchWpPosts({
      page,
      perPage,
      search,
      categories: categories || undefined,
    });

    const mediaItems = result.rawPosts
      .filter((p) => p.status === 'publish' && isMediaPost(p))
      .map(mapWordPressMediaPost);

    if (isNumber) {
      return mediaItems;
    }

    return {
      posts: mediaItems,
      totalPosts: result.totalPosts,
      totalPages: result.totalPages,
      currentPage: result.currentPage,
      perPage: result.perPage,
      hasNextPage: result.hasNextPage,
      hasPrevPage: result.hasPrevPage,
    };
  } catch (err) {
    console.error('Failed to fetch WordPress media posts:', err);
    throw err;
  }
}

/**
 * Fetches an individual Blog post by slug.
 */
export async function fetchPostBySlug(slug) {
  if (!slug) return null;
  try {
    const result = await fetchWpPosts({ slug: encodeURIComponent(slug), perPage: 1 });
    if (!result.rawPosts || result.rawPosts.length === 0) return null;
    const post = result.rawPosts[0];
    if (isCareerPost(post)) return null;
    return mapWordPressBlogPost(post);
  } catch (error) {
    console.error(`Failed to fetch WordPress blog post with slug "${slug}":`, error);
    throw error;
  }
}

/**
 * Fetches an individual Career post by slug.
 */
export async function fetchCareerPostBySlug(slug) {
  if (!slug) return null;
  try {
    const result = await fetchWpPosts({ slug: encodeURIComponent(slug), perPage: 1 });
    if (!result.rawPosts || result.rawPosts.length === 0) return null;
    const post = result.rawPosts[0];
    if (!isCareerPost(post)) return null;
    return mapWordPressCareerPost(post);
  } catch (error) {
    console.error(`Failed to fetch WordPress career post with slug "${slug}":`, error);
    throw error;
  }
}

/**
 * Fetches an individual Media post by slug.
 */
export async function fetchMediaPostBySlug(slug) {
  if (!slug) return null;
  try {
    const result = await fetchWpPosts({ slug: encodeURIComponent(slug), perPage: 1 });
    if (!result.rawPosts || result.rawPosts.length === 0) return null;
    const post = result.rawPosts[0];
    if (!isMediaPost(post)) return null;
    return mapWordPressMediaPost(post);
  } catch (error) {
    console.error(`Failed to fetch WordPress media post with slug "${slug}":`, error);
    throw error;
  }
}
