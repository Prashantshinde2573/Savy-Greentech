import { useState, useMemo, useRef } from 'react';
import { PiArrowRight, PiClock, PiMagnifyingGlass, PiX } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { PageHero } from '../components/PageHero';
import { SEOHead } from '../components/SEOHead';
import { blogs, blogCategories } from '../data/blogs';
import { usePageAnimations } from '../hooks/usePageAnimations';

export function BlogPage() {
  const pageRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  usePageAnimations(pageRef);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((post) => {
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          post.title.toLowerCase().includes(q) ||
          post.excerpt.toLowerCase().includes(q) ||
          post.content.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <main id="top" className="blog-page" ref={pageRef}>
      <SEOHead
        title="Blog & Insights | Commercial EV Adoption & Mobility Technology"
        description="Thought leadership, total cost of ownership analysis, campus transit case insights, and municipal sanitation electrification articles by SAVY Greentech."
      />
      <SiteHeader currentPath="/blog" transparentInitially={false} />

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
            {blogCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`category-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
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
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search articles"
            />
            {searchQuery && (
              <button type="button" className="clear-search" onClick={() => setSearchQuery('')} aria-label="Clear search">
                <PiX />
              </button>
            )}
          </div>

          {/* Articles Grid */}
          {filteredBlogs.length === 0 ? (
            <div className="no-products-found">
              <p>No articles found matching your query.</p>
              <button type="button" className="button-link primary" onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}>
                <span>View All Articles</span>
              </button>
            </div>
          ) : (
            <div className="blog-articles-grid">
              {filteredBlogs.map((post) => (
                <article className="blog-card" key={post.slug}>
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
                      Read full article <PiArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
