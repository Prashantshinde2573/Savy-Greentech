import { useState, useMemo, useRef, useEffect } from 'react';
import { PiArrowRight, PiClock, PiMagnifyingGlass, PiX } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { fetchPublishedPosts } from '../services/wordpress';
import { usePageAnimations } from '../hooks/usePageAnimations';

export function BlogPage() {
  const pageRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  usePageAnimations(pageRef);

  useEffect(() => {
    let isMounted = true;
    async function loadPosts() {
      try {
        setLoading(true);
        const wpPosts = await fetchPublishedPosts();
        if (isMounted) {
          setPosts(wpPosts || []);
        }
      } catch (err) {
        console.error('WordPress API error for blog posts:', err);
        if (isMounted) {
          setPosts([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPosts();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  // Compute dynamic categories directly from posts
  const categoriesList = useMemo(() => {
    const set = new Set(['All']);
    posts.forEach((p) => {
      if (p.category && p.category.toLowerCase() !== 'careers' && p.category.toLowerCase() !== 'news') {
        set.add(p.category);
      }
    });
    return Array.from(set);
  }, [posts]);

  const filteredBlogs = useMemo(() => {
    return posts.filter((post) => {
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          (post.content && post.content.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [posts, selectedCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / postsPerPage));
  const currentPaginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredBlogs.slice(startIndex, startIndex + postsPerPage);
  }, [filteredBlogs, currentPage, postsPerPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      const target = document.getElementById('articles');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <main id="top" className="blog-page" ref={pageRef}>
      <SEOHead
        title="Blog & Insights | Commercial EV Adoption & Mobility Technology"
        description="Thought leadership, total cost of ownership analysis, campus transit case insights, and municipal sanitation electrification articles by SAVY Greentech."
      />
      <SiteHeader currentPath="/blog" transparentInitially={true} />

      <PageHero
        eyebrow="Knowledge &amp; Insights"
        title="Electric Mobility Insights"
        description="Industry education, technological deep-dives, and total cost of ownership analysis shaping India's commercial electric transition."
        videoSrc="/assets/about-hero.mp4"
        primaryCtaText="Read Featured Article"
        primaryCtaHref="#articles"
        secondaryCtaText="Explore Categories"
        secondaryCtaHref="#categories"
      />

      {/* Blog Directory Section */}
      <section className="section-cream blog-directory-section" id="articles" aria-labelledby="blog-heading">
        <div className="container">
          {/* Category Tabs */}
          <div className="category-filter-tabs" id="categories" role="tablist">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="blog-search-bar">
            <PiMagnifyingGlass aria-hidden="true" />
            <input
              type="search"
              placeholder="Search articles by title or keyword..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              aria-label="Search articles"
            />
            {searchQuery && (
              <button type="button" className="clear-search" onClick={() => handleSearchChange('')} aria-label="Clear search">
                <PiX />
              </button>
            )}
          </div>

          {/* Articles Grid */}
          {loading ? (
            <div className="blog-articles-grid" aria-busy="true" aria-label="Loading articles">
              {[1, 2, 3].map((n) => (
                <article className="blog-card blog-card-skeleton" key={n} style={{ opacity: 0.7 }}>
                  <div className="blog-card-media" style={{ background: '#e2e8e5', minHeight: '200px' }} />
                  <div className="blog-card-body" style={{ padding: '24px' }}>
                    <div style={{ height: '14px', width: '40%', background: '#e2e8e5', borderRadius: '4px', marginBottom: '16px' }} />
                    <div style={{ height: '22px', width: '85%', background: '#e2e8e5', borderRadius: '6px', marginBottom: '12px' }} />
                    <div style={{ height: '14px', width: '100%', background: '#e2e8e5', borderRadius: '4px', marginBottom: '8px' }} />
                    <div style={{ height: '14px', width: '70%', background: '#e2e8e5', borderRadius: '4px' }} />
                  </div>
                </article>
              ))}
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="no-products-found">
              <p>No articles found matching your query.</p>
              <button type="button" className="button-link primary" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); setCurrentPage(1); }}>
                <span>View All Articles</span>
              </button>
            </div>
          ) : (
            <>
              <div className="blog-articles-grid">
                {currentPaginatedBlogs.map((post) => (
                  <article className="blog-card" key={post.id || post.slug}>
                    <a href={`/blog/${post.slug}`} className="blog-card-media" aria-label={`Read ${post.title}`}>
                      <img src={post.image} alt={post.title} loading="lazy" />
                      <span className="blog-cat-badge">{post.category}</span>
                    </a>
                    <div className="blog-card-body">
                      <div className="blog-meta-row">
                        <span>{post.date}</span>
                        <span>·</span>
                        <span><PiClock /> {post.readTime}</span>
                      </div>
                      <h3>
                        <a href={`/blog/${post.slug}`}>{post.title}</a>
                      </h3>
                      <p className="blog-excerpt">{post.excerpt}</p>
                      <a href={`/blog/${post.slug}`} className="blog-read-link">
                        Read Full Blog <PiArrowRight aria-hidden="true" />
                      </a>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="savy-pagination" role="navigation" aria-label="Articles Pagination">
                  <button
                    type="button"
                    className="pagination-btn pagination-prev"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Previous page"
                  >
                    ← Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNum)}
                      aria-current={currentPage === pageNum ? 'page' : undefined}
                      aria-label={`Page ${pageNum}`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  <button
                    type="button"
                    className="pagination-btn pagination-next"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    aria-label="Next page"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
