import React, { useState, useEffect, lazy, Suspense } from 'react';
import { App } from './App.jsx';
import { getCategoryBySlug, getProductBySlug } from './data/products.js';
import { FloatingWhatsApp } from './components/FloatingWhatsApp.jsx';

// Lazy-load secondary and auxiliary routes to keep initial bundle lean
const HomeOld = lazy(() => import('./HomeOld.jsx').then(m => ({ default: m.HomeOld })));
const AboutPage = lazy(() => import('./pages/AboutPage.jsx').then(m => ({ default: m.AboutPage })));
const ProductsPage = lazy(() => import('./pages/ProductsPage.jsx').then(m => ({ default: m.ProductsPage })));
const ProductCategoryPage = lazy(() => import('./pages/ProductCategoryPage.jsx').then(m => ({ default: m.ProductCategoryPage })));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage.jsx').then(m => ({ default: m.ProductDetailPage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx').then(m => ({ default: m.NotFoundPage })));
const ApplicationsPage = lazy(() => import('./pages/ApplicationsPage.jsx').then(m => ({ default: m.ApplicationsPage })));
const TechnologyPage = lazy(() => import('./pages/TechnologyPage.jsx').then(m => ({ default: m.TechnologyPage })));
const SustainabilityPage = lazy(() => import('./pages/SustainabilityPage.jsx').then(m => ({ default: m.SustainabilityPage })));
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage.jsx').then(m => ({ default: m.CaseStudiesPage })));
const MediaPage = lazy(() => import('./pages/MediaPage.jsx').then(m => ({ default: m.MediaPage })));
const BecomeDealerPage = lazy(() => import('./pages/BecomeDealerPage.jsx').then(m => ({ default: m.BecomeDealerPage })));
const CareersPage = lazy(() => import('./pages/CareersPage.jsx').then(m => ({ default: m.CareersPage })));
const CareerDetailPage = lazy(() => import('./pages/CareerDetailPage.jsx').then(m => ({ default: m.CareerDetailPage })));
const BlogPage = lazy(() => import('./pages/BlogPage.jsx').then(m => ({ default: m.BlogPage })));
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage.jsx').then(m => ({ default: m.BlogDetailPage })));
const ContactPage = lazy(() => import('./pages/ContactPage.jsx').then(m => ({ default: m.ContactPage })));
const PolicyPage = lazy(() => import('./pages/PolicyPage.jsx').then(m => ({ default: m.PolicyPage })));
const FlowButtonDemo = lazy(() => import('./components/demo.tsx'));

export function AppRouter() {
  const [currentPath, setCurrentPath] = useState(() => {
    return window.location.pathname.replace(/\/$/, '') || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname.replace(/\/$/, '') || '/');
    };

    const handleLinkClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      // If anchor has target="_blank", mailto:, tel:, or is an external link, let browser handle
      if (!href || anchor.target === '_blank' || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('http://') || href.startsWith('https://')) {
        return;
      }

      // If it's a pure hash on the same page, let standard browser scroll behavior work
      if (href.startsWith('#')) {
        return;
      }

      // If internal route link
      if (href.startsWith('/')) {
        // If it's a hash on the homepage e.g. /#vehicles
        if (href.startsWith('/#')) {
          if (currentPath === '/') {
            // Already on home, let default hash jump happen
            return;
          }
          // Navigate to home with hash
          e.preventDefault();
          window.history.pushState({}, '', href);
          setCurrentPath('/');
          setTimeout(() => {
            const hashId = href.replace('/#', '');
            const target = document.getElementById(hashId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
          }, 100);
          return;
        }

        e.preventDefault();
        document.body.classList.remove('menu-backdrop-open');
        window.history.pushState({}, '', href);
        setCurrentPath(href.split('#')[0].replace(/\/$/, '') || '/');
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('popstate', handlePopState);
    document.addEventListener('click', handleLinkClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [currentPath]);

  // Routing Switch
  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') return <App key="home" />;
    if (currentPath === '/home-old') return <HomeOld key="home-old" />;
    if (currentPath === '/flow-button') return <FlowButtonDemo key="flow-button" />;
    if (currentPath === '/about') return <AboutPage key="about" />;
    if (currentPath === '/products') return <ProductsPage key="products" />;
    
    if (currentPath.startsWith('/category/')) {
      const rawSlug = currentPath.replace('/category/', '').replace(/\/$/, '');
      const categoryMatch = getCategoryBySlug(rawSlug);
      if (categoryMatch) {
        return <ProductCategoryPage key={`cat-${categoryMatch.slug}`} categorySlug={categoryMatch.slug} />;
      }
      return <NotFoundPage key="not-found" />;
    }

    if (currentPath.startsWith('/products/')) {
      const rawSlug = currentPath.replace('/products/', '').replace(/\/$/, '');
      const categoryMatch = getCategoryBySlug(rawSlug);
      if (categoryMatch) {
        return <ProductCategoryPage key={`cat-${categoryMatch.slug}`} categorySlug={categoryMatch.slug} />;
      }
      const productMatch = getProductBySlug(rawSlug);
      if (productMatch) {
        return <ProductDetailPage key={`pdp-${productMatch.slug}`} slug={productMatch.slug} />;
      }
      return <NotFoundPage key="not-found" />;
    }

    if (currentPath === '/applications') return <ApplicationsPage key="applications" />;
    if (currentPath === '/technology') return <TechnologyPage key="technology" />;
    if (currentPath === '/sustainability') return <SustainabilityPage key="sustainability" />;
    if (currentPath === '/case-studies') return <CaseStudiesPage key="case-studies" />;
    if (currentPath === '/media') return <MediaPage key="media" />;
    if (currentPath === '/become-a-dealer') return <BecomeDealerPage key="become-a-dealer" />;
    if (currentPath === '/careers') return <CareersPage key="careers" />;
    if (currentPath.startsWith('/careers/')) {
      const slug = currentPath.replace('/careers/', '').replace(/\/$/, '');
      return <CareerDetailPage key={`career-${slug}`} slug={slug} />;
    }
    if (currentPath === '/blog') return <BlogPage key="blog" />;
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '').replace(/\/$/, '');
      return <BlogDetailPage key={`blog-${slug}`} slug={slug} />;
    }
    if (currentPath === '/contact') return <ContactPage key="contact" />;
    if (currentPath === '/warranty') return <PolicyPage key="policy-warranty" policyType="warranty" />;
    if (currentPath === '/privacy-policy') return <PolicyPage key="policy-privacy" policyType="privacy-policy" />;
    if (currentPath === '/terms') return <PolicyPage key="policy-terms" policyType="terms" />;
    if (currentPath === '/cookie-policy') return <PolicyPage key="policy-cookie" policyType="cookie-policy" />;

    // 404 Not Found Catch-All
    return <NotFoundPage key="not-found" />;
  };

  return (
    <>
      <Suspense fallback={null}>
        {renderPage()}
      </Suspense>
      <FloatingWhatsApp />
    </>
  );
}
