import React, { useState, useEffect } from 'react';
import { App } from './App.jsx';
import { HomeOld } from './HomeOld.jsx';
import { AboutPage } from './pages/AboutPage.jsx';
import { ProductsPage } from './pages/ProductsPage.jsx';
import { ProductDetailPage } from './pages/ProductDetailPage.jsx';
import { ApplicationsPage } from './pages/ApplicationsPage.jsx';
import { TechnologyPage } from './pages/TechnologyPage.jsx';
import { SustainabilityPage } from './pages/SustainabilityPage.jsx';
import { CaseStudiesPage } from './pages/CaseStudiesPage.jsx';
import { MediaPage } from './pages/MediaPage.jsx';
import { BecomeDealerPage } from './pages/BecomeDealerPage.jsx';
import { CareersPage } from './pages/CareersPage.jsx';
import { CareerDetailPage } from './pages/CareerDetailPage.jsx';
import { BlogPage } from './pages/BlogPage.jsx';
import { BlogDetailPage } from './pages/BlogDetailPage.jsx';
import { ContactPage } from './pages/ContactPage.jsx';
import { PolicyPage } from './pages/PolicyPage.jsx';
import FlowButtonDemo from './components/demo.tsx';

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
  if (currentPath === '/home-old') return <HomeOld />;
  if (currentPath === '/flow-button') return <FlowButtonDemo />;
  if (currentPath === '/about') return <AboutPage />;
  if (currentPath === '/products') return <ProductsPage />;
  if (currentPath.startsWith('/products/')) {
    const slug = currentPath.replace('/products/', '');
    return <ProductDetailPage slug={slug} />;
  }
  if (currentPath === '/applications') return <ApplicationsPage />;
  if (currentPath === '/technology') return <TechnologyPage />;
  if (currentPath === '/sustainability') return <SustainabilityPage />;
  if (currentPath === '/case-studies') return <CaseStudiesPage />;
  if (currentPath === '/media') return <MediaPage />;
  if (currentPath === '/become-a-dealer') return <BecomeDealerPage />;
  if (currentPath === '/careers') return <CareersPage />;
  if (currentPath.startsWith('/careers/')) {
    const slug = currentPath.replace('/careers/', '');
    return <CareerDetailPage slug={slug} />;
  }
  if (currentPath === '/blog') return <BlogPage />;
  if (currentPath.startsWith('/blog/')) {
    const slug = currentPath.replace('/blog/', '');
    return <BlogDetailPage slug={slug} />;
  }
  if (currentPath === '/contact') return <ContactPage />;
  if (currentPath === '/warranty') return <PolicyPage policyType="warranty" />;
  if (currentPath === '/privacy-policy') return <PolicyPage policyType="privacy-policy" />;
  if (currentPath === '/terms') return <PolicyPage policyType="terms" />;
  if (currentPath === '/cookie-policy') return <PolicyPage policyType="cookie-policy" />;

  // Default: Homepage (Locked App.jsx)
  return <App />;
}
