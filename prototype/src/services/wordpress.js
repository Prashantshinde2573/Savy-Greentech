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

  if (!base || base === 'undefined' || base === 'null' || typeof base !== 'string') {
    base = DEFAULT_API_BASE;
  }

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
 * Fetches all categories from WordPress CMS (cached).
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
 * Helper to get category classifications.
 */
export async function getCategoryClassification() {
  const cats = await fetchAllCategories();
  const careerIds = [];
  const newsIds = [];
  const industryIds = [];

  cats.forEach((c) => {
    const slug = (c.slug || '').toLowerCase();
    const name = (c.name || '').toLowerCase();

    if (slug === 'careers' || name === 'careers' || name.includes('career')) {
      careerIds.push(c.id);
    } else if (slug === 'news' || name === 'news') {
      newsIds.push(c.id);
    } else if (
      slug === 'industry-participation' ||
      slug === 'exhibitions' ||
      name.includes('industry participation') ||
      name.includes('exhibition')
    ) {
      industryIds.push(c.id);
    }
  });

  return {
    careerIds,
    newsIds,
    industryIds,
    mediaIds: [...newsIds, ...industryIds],
    blogExcludeIds: [...careerIds, ...newsIds, ...industryIds],
  };
}



/**
 * Checks if a WordPress post belongs to Industry Participation.
 */
export function isIndustryParticipationPost(post) {
  if (!post) return false;
  if (Array.isArray(post.categories) && post.categories.includes(5)) return true;
  if (Array.isArray(post.class_list) && post.class_list.includes('category-industry-participation')) return true;
  const terms = getPostTerms(post);
  if (
    terms.some(
      (t) =>
        t.slug === 'industry-participation' ||
        t.slug === 'exhibitions' ||
        t.name.toLowerCase().includes('industry participation') ||
        t.name.toLowerCase().includes('exhibition')
    )
  ) {
    return true;
  }
  if (post.acf && (post.acf.exhibitions_name || post.acf.year)) {
    return true;
  }
  return false;
}

/**
 * Checks if a WordPress post is a News post.
 */
export function isNewsPost(post) {
  if (!post) return false;
  if (Array.isArray(post.categories) && post.categories.includes(4)) return true;
  if (Array.isArray(post.class_list) && post.class_list.includes('category-news')) return true;
  const terms = getPostTerms(post);
  if (terms.some((t) => t.slug === 'news' || t.name.toLowerCase() === 'news')) {
    return true;
  }
  if (post.acf && (post.acf.publication_name || post.acf.news_link)) {
    return true;
  }
  return false;
}

/**
 * Checks if a WordPress post is a Careers / Job post.
 */
export function isCareerPost(post) {
  if (!post) return false;
  if (Array.isArray(post.categories) && post.categories.includes(2)) return true;
  if (Array.isArray(post.class_list) && post.class_list.includes('category-careers')) return true;
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
  if (post.acf && (post.acf.job_type || post.acf.job_category || (post.acf.experience && !isIndustryParticipationPost(post)))) {
    return true;
  }
  if (post.slug && post.slug.toLowerCase().startsWith('job-')) {
    return true;
  }
  return false;
}

/**
 * Checks if a WordPress post belongs to Media (News OR Industry Participation).
 */
export function isMediaPost(post) {
  return isNewsPost(post) || isIndustryParticipationPost(post);
}

/**
 * Checks if a post is a standard Blog post.
 */
export function isBlogPost(post) {
  if (!post) return false;
  return !isCareerPost(post) && !isNewsPost(post) && !isIndustryParticipationPost(post);
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
      t.slug !== 'news' &&
      t.slug !== 'industry-participation'
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
 * Maps a raw WordPress post to a clean Blog structure.
 */
export function mapWordPressBlogPost(post) {
  const fallbackImage = '/assets/classic-golf.jpeg';
  const cleanTitle = stripHtml(post.title?.rendered || post.title || '');
  const cleanExcerpt = stripHtml(post.excerpt?.rendered || post.excerpt || '');
  const content = post.content?.rendered || (typeof post.content === 'string' ? post.content : '') || '';
  const image = extractFeaturedImage(post, fallbackImage);
  const primaryTerm = post._embedded?.['wp:term']?.[0]?.[0];
  const categoryName = primaryTerm?.name ? stripHtml(primaryTerm.name) : extractBlogCategory(post);

  return {
    id: post.id || post.ID || post.slug,
    slug: post.slug,
    title: cleanTitle,
    rawTitle: post.title?.rendered || post.title || '',
    category: categoryName,
    categorySlug: primaryTerm?.slug || '',
    categoryId: primaryTerm?.id || null,
    date: formatBlogDate(post.date),
    isoDate: post.date,
    author: post._embedded?.author?.[0]?.name || post.author?.name || 'SAVY Engineering Team',
    readTime: calculateReadTime(content || cleanExcerpt),
    image,
    excerpt: cleanExcerpt,
    content,
    acf: post.acf || {},
    status: post.status || 'publish',
  };
}

/**
 * Maps a raw WordPress post to a clean Career/Job structure.
 * ACF fields: location, experience, job_type, job_category
 */
export function mapWordPressCareerPost(post) {
  const cleanTitle = stripHtml(post.title?.rendered || post.title || '');
  const content = post.content?.rendered || (typeof post.content === 'string' ? post.content : '') || '';
  const cleanExcerpt = stripHtml(post.excerpt?.rendered || post.excerpt || '');
  const acf = (post.acf && typeof post.acf === 'object' && !Array.isArray(post.acf)) ? post.acf : {};

  const location = acf.location ? stripHtml(acf.location) : '';
  const experience = acf.experience ? stripHtml(acf.experience) : '';
  const jobType = acf.job_type ? stripHtml(acf.job_type) : '';
  const jobCategory = acf.job_category ? stripHtml(acf.job_category) : '';
  const department = jobCategory;

  return {
    ...post,
    id: post.id || post.ID || post.slug,
    slug: post.slug,
    title: cleanTitle,
    rawTitle: post.title?.rendered || post.title || '',
    department,
    job_category: jobCategory,
    jobCategory,
    location,
    experience,
    type: jobType,
    job_type: jobType,
    jobType,
    description: cleanExcerpt || (content ? stripHtml(content).slice(0, 180) + '...' : ''),
    content,
    acf: {
      location,
      experience,
      job_type: jobType,
      job_category: jobCategory,
      ...acf,
    },
    date: formatBlogDate(post.date),
    isoDate: post.date,
    status: post.status || 'publish',
  };
}

/**
 * Maps a raw WordPress post to a clean News structure.
 * ACF fields: publication_name, news_link, date
 * The Read Article button MUST use post.acf?.news_link.
 */
export function mapWordPressNewsPost(post) {
  const cleanTitle = stripHtml(post.title?.rendered || post.title || '');
  const cleanExcerpt = stripHtml(post.excerpt?.rendered || post.excerpt || '');
  const content = post.content?.rendered || (typeof post.content === 'string' ? post.content : '') || '';
  const image = extractFeaturedImage(post, '/assets/news/ipm-premium-electric-mobility.png');
  const acf = (post.acf && typeof post.acf === 'object' && !Array.isArray(post.acf)) ? post.acf : {};

  const publicationName = acf.publication_name ? stripHtml(acf.publication_name) : '';
  const newsLink = acf.news_link ? String(acf.news_link).trim() : '';
  const newsDate = acf.date ? stripHtml(acf.date) : '';
  const metaDate = publicationName && newsDate ? `${publicationName} · ${newsDate}` : (publicationName || newsDate || '');

  return {
    ...post,
    id: post.id || post.ID || post.slug,
    slug: post.slug,
    title: cleanTitle,
    rawTitle: post.title?.rendered || post.title || '',
    copy: cleanExcerpt,
    description: cleanExcerpt,
    excerpt: cleanExcerpt,
    content,
    image,
    publication: publicationName,
    publication_name: publicationName,
    publicationName: publicationName,
    metaDate,
    category: metaDate,
    href: newsLink,
    news_link: newsLink,
    newsLink: newsLink,
    isEvent: false,
    date: newsDate,
    isoDate: post.date,
    acf: {
      publication_name: publicationName,
      news_link: newsLink,
      date: newsDate,
      ...acf,
    },
    status: post.status || 'publish',
  };
}

/**
 * Maps a raw WordPress post to a clean Industry Participation structure.
 * ACF fields: exhibitions_name, location, year
 * The year MUST come strictly from post.acf?.year.
 */
export function mapWordPressIndustryParticipationPost(post) {
  const cleanTitle = stripHtml(post.title?.rendered || post.title || '');
  const cleanExcerpt = stripHtml(post.excerpt?.rendered || post.excerpt || '');
  const content = post.content?.rendered || (typeof post.content === 'string' ? post.content : '') || '';
  const image = extractFeaturedImage(post, '/assets/news/city-pod-netherlands.jpg');
  const acf = (post.acf && typeof post.acf === 'object' && !Array.isArray(post.acf)) ? post.acf : {};

  const exhibitionsName = acf.exhibitions_name ? stripHtml(acf.exhibitions_name) : '';
  const location = acf.location ? stripHtml(acf.location) : '';
  const year = acf.year ? String(acf.year).trim() : '';
  const role = acf.role ? stripHtml(acf.role) : '';

  return {
    ...post,
    id: post.id || post.ID || post.slug,
    slug: post.slug,
    title: cleanTitle,
    rawTitle: post.title?.rendered || post.title || '',
    copy: cleanExcerpt,
    description: cleanExcerpt,
    excerpt: cleanExcerpt,
    content,
    image,
    category: exhibitionsName,
    exhibitions_name: exhibitionsName,
    exhibitionsName: exhibitionsName,
    location,
    year,
    role,
    acf: {
      exhibitions_name: exhibitionsName,
      location,
      year,
      role,
      ...acf,
    },
    isEvent: true,
    status: post.status || 'publish',
  };
}

/**
 * Combined Media post mapper.
 */
export function mapWordPressMediaPost(post) {
  if (isIndustryParticipationPost(post)) {
    return mapWordPressIndustryParticipationPost(post);
  }
  return mapWordPressNewsPost(post);
}

/**
 * WordPress API fetcher that retrieves published posts preserving full raw data and ACF fields.
 */
export async function fetchAllWpPosts({ search = '', categories = '', categoriesExclude = '', slug = '' } = {}) {
  const base = getWordpressApiBase();
  try {
    const params = new URLSearchParams();
    params.set('_embed', '1');
    params.set('per_page', '100');
    if (search) params.set('search', search);
    if (categories) params.set('categories', String(categories));
    if (categoriesExclude) params.set('categories_exclude', String(categoriesExclude));
    if (slug) params.set('slug', slug);

    const url = `${base}/posts?${params.toString()}`;
    console.log("CMS API:", url);
    const res = await fetch(url);
    console.log("CMS response:", res.status);
    if (!res.ok) {
      throw new Error(`WordPress API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const posts = Array.isArray(data) ? data : [];
    console.log("CMS posts:", posts.length);
    return posts;
  } catch (err) {
    console.error("CMS fetch error:", err);
    throw err;
  }
}

/**
 * Fetches all published Blog posts from the WordPress CMS.
 * Returns exactly the published items present in WordPress CMS.
 */
export async function fetchPublishedPosts() {
  try {
    const rawPosts = await fetchAllWpPosts();
    return rawPosts
      .filter((p) => p.status === 'publish' && isBlogPost(p))
      .map(mapWordPressBlogPost);
  } catch (err) {
    console.error('Failed to fetch WordPress blog posts:', err);
    throw err;
  }
}

/**
 * Fetches all published Career posts from the WordPress CMS.
 * Returns exactly the published items present in WordPress CMS.
 */
export async function fetchCareerPosts() {
  try {
    const rawPosts = await fetchAllWpPosts();
    return rawPosts
      .filter((p) => p.status === 'publish' && isCareerPost(p))
      .map(mapWordPressCareerPost);
  } catch (err) {
    console.error('Failed to fetch WordPress career posts:', err);
    throw err;
  }
}

/**
 * Fetches all published News posts from the WordPress CMS.
 * Returns exactly the published items present in WordPress CMS with their custom article links.
 */
export async function fetchNewsPosts() {
  try {
    const rawPosts = await fetchAllWpPosts();
    return rawPosts
      .filter((p) => p.status === 'publish' && isNewsPost(p))
      .map(mapWordPressNewsPost);
  } catch (err) {
    console.error('Failed to fetch WordPress news posts:', err);
    throw err;
  }
}

/**
 * Fetches all published Industry Participation posts from the WordPress CMS.
 * Returns exactly the published items present in WordPress CMS with their custom ACF year.
 */
export async function fetchIndustryParticipationPosts() {
  try {
    const rawPosts = await fetchAllWpPosts();
    return rawPosts
      .filter((p) => p.status === 'publish' && isIndustryParticipationPost(p))
      .map(mapWordPressIndustryParticipationPost);
  } catch (err) {
    console.error('Failed to fetch WordPress industry participation posts:', err);
    throw err;
  }
}

/**
 * Fetches all published Media items (both News and Industry Participation).
 */
export async function fetchMediaPosts() {
  try {
    const rawPosts = await fetchAllWpPosts();
    return rawPosts
      .filter((p) => p.status === 'publish' && isMediaPost(p))
      .map(mapWordPressMediaPost);
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
    const rawPosts = await fetchAllWpPosts({ slug: encodeURIComponent(slug) });
    if (!rawPosts || rawPosts.length === 0) return null;
    const post = rawPosts[0];
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
    const rawPosts = await fetchAllWpPosts({ slug: encodeURIComponent(slug) });
    if (!rawPosts || rawPosts.length === 0) return null;
    const post = rawPosts[0];
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
    const rawPosts = await fetchAllWpPosts({ slug: encodeURIComponent(slug) });
    if (!rawPosts || rawPosts.length === 0) return null;
    const post = rawPosts[0];
    if (!isMediaPost(post)) return null;
    return mapWordPressMediaPost(post);
  } catch (error) {
    console.error(`Failed to fetch WordPress media post with slug "${slug}":`, error);
    throw error;
  }
}

// Unified aliases
export const getPosts = fetchAllWpPosts;
export const getBlogs = fetchPublishedPosts;
export const getCareers = fetchCareerPosts;
export const getNews = fetchNewsPosts;
export const getIndustryParticipation = fetchIndustryParticipationPosts;
export const getMedia = fetchMediaPosts;
export const getPostBySlug = fetchPostBySlug;
export const getCareerBySlug = fetchCareerPostBySlug;
