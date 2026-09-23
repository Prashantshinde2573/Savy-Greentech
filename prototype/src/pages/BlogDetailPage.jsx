import { useState, useRef, useEffect } from 'react';
import { PiArrowLeft, PiArrowRight, PiClock, PiShareNetwork, PiUser } from 'react-icons/pi';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { SEOHead } from '../components/SEOHead';
import { QuoteModal } from '../components/QuoteModal';
import { blogs as fallbackBlogs, getBlogBySlug } from '../data/blogs';
import { fetchPostBySlug, fetchPublishedPosts } from '../services/wordpress';
import { usePageAnimations } from '../hooks/usePageAnimations';

export function BlogDetailPage({ slug }) {
  const pageRef = useRef(null);
  const fallback = getBlogBySlug(slug) || fallbackBlogs[0];
  const [post, setPost] = useState(fallback);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  usePageAnimations(pageRef);

  useEffect(() => {
    let isMounted = true;
    async function loadPostData() {
      try {
        setLoading(true);
        // Fetch current post by slug
        const wpPost = await fetchPostBySlug(slug);
        if (isMounted && wpPost) {
          setPost(wpPost);
        } else if (isMounted) {
          setPost(getBlogBySlug(slug) || fallbackBlogs[0]);
        }

        // Fetch related posts
        const allWpPosts = await fetchPublishedPosts(6);
        if (isMounted) {
          const list = (allWpPosts && allWpPosts.length > 0 ? allWpPosts : fallbackBlogs)
            .filter((b) => b.slug !== slug)
            .slice(0, 2);
          setRelatedPosts(list);
        }
      } catch (err) {
        console.warn(`Error loading blog "${slug}", using fallback:`, err);
        if (isMounted) {
          const fb = getBlogBySlug(slug) || fallbackBlogs[0];
          setPost(fb);
          setRelatedPosts(fallbackBlogs.filter((b) => b.slug !== fb.slug).slice(0, 2));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadPostData();
    window.scrollTo(0, 0);
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <main id="top" className="blog-detail-page" ref={pageRef}>
      <SEOHead
        title={`${post.title} | SAVY Insights`}
        description={post.excerpt}
      />
      <SiteHeader currentPath="/blog" transparentInitially={false} />

      {/* Article Header & Breadcrumbs */}
      <section className="section-white article-header-section" aria-labelledby="article-title">
        <div className="container article-container">
          <div className="breadcrumb-inner" style={{ marginBottom: '24px' }}>
            <a href="/blog" className="breadcrumb-back-link">
              <PiArrowLeft aria-hidden="true" /> Back to Insights
            </a>
          </div>

          <div className="article-meta-top">
            <span className="blog-cat-badge">{post.category}</span>
            <span>{post.date}</span>
            <span>·</span>
            <span><PiClock /> {post.readTime}</span>
          </div>

          <h1 id="article-title" className="article-main-title">{post.title}</h1>
          <p className="article-lead-p">{post.excerpt}</p>

          <div className="article-author-strip">
            <div className="author-info">
              <PiUser className="author-avatar-icon" />
              <div>
                <strong>{post.author}</strong>
                <span>SAVY Greentech Insights</span>
              </div>
            </div>
            <button type="button" className="share-btn" onClick={handleShare} aria-label="Share article">
              <PiShareNetwork /> Share Article
            </button>
          </div>
        </div>
      </section>

      {/* Article Featured Image */}
      <section className="section-white article-media-section">
        <div className="container article-container">
          <div className="article-featured-image-wrap">
            <img src={post.image} alt={post.title} />
          </div>
        </div>
      </section>

      {/* Article Content Body */}
      <section className="section-white article-body-section">
        <div className="container article-container">
          <div className="article-content-prose">
            {post.content && /<[a-z][\s\S]*>/i.test(post.content) ? (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            ) : (
              (post.content || '').split('\n\n').map((paragraph, idx) => {
                const trimmed = paragraph.trim();
                if (trimmed.startsWith('### ')) {
                  return <h2 key={idx}>{trimmed.replace('### ', '')}</h2>;
                }
                if (trimmed.startsWith('1. ') || trimmed.startsWith('2. ') || trimmed.startsWith('3. ') || trimmed.startsWith('- ')) {
                  return (
                    <div key={idx} className="prose-list-block">
                      {trimmed.split('\n').map((line, liIdx) => (
                        <p key={liIdx} className="prose-bullet-line">{line}</p>
                      ))}
                    </div>
                  );
                }
                return <p key={idx}>{trimmed}</p>;
              })
            )}
          </div>

          {/* Article End CTA Card */}
          <div className="article-cta-box">
            <p className="eyebrow mint">Electrify Your Fleet</p>
            <h3>Ready to implement purpose-built electric vehicles in your operations?</h3>
            <p>Speak directly with our engineering and commercial advisory team.</p>
            <button type="button" className="button-link primary" onClick={() => setModalOpen(true)}>
              <span>Discuss Your Fleet Plan</span>
              <PiArrowRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-cream related-blogs-section" aria-labelledby="related-articles-title">
          <div className="container">
            <div className="section-heading center">
              <p className="eyebrow">Continue Reading</p>
              <h2 id="related-articles-title">Related Insights</h2>
            </div>

            <div className="blog-articles-grid" style={{ maxWidth: '900px', margin: 'auto' }}>
              {relatedPosts.map((rel) => (
                <article className="blog-card" key={rel.id || rel.slug}>
                  <a href={`/blog/${rel.slug}`} className="blog-card-media" aria-label={`Read ${rel.title}`}>
                    <img src={rel.image} alt={rel.title} loading="lazy" />
                    <span className="blog-cat-badge">{rel.category}</span>
                  </a>
                  <div className="blog-card-body">
                    <div className="blog-meta-row">
                      <span>{rel.date}</span>
                      <span>·</span>
                      <span><PiClock /> {rel.readTime}</span>
                    </div>
                    <h3>
                      <a href={`/blog/${rel.slug}`}>{rel.title}</a>
                    </h3>
                    <p className="blog-excerpt">{rel.excerpt}</p>
                    <a href={`/blog/${rel.slug}`} className="blog-read-link">
                      Read article <PiArrowRight aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <QuoteModal isOpen={modalOpen} onClose={() => setModalOpen(false)} defaultVehicle="General Fleet Inquiry" mode="quote" />
      <SiteFooter />
    </main>
  );
}
