import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function usePageAnimations(scopeRef) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Hero elements reveal
      const heroTimeline = gsap.timeline({ defaults: { duration: 0.85, ease: 'power4.out' } });
      heroTimeline
        .from('.page-hero .eyebrow, .article-header-section .blog-cat-badge, .policy-badge-row', { autoAlpha: 0, y: 18 }, 0.12)
        .from('.page-hero h1, .article-main-title, .policy-main-title', { autoAlpha: 0, y: 28 }, 0.2)
        .from('.page-hero-copy, .article-lead-p, .hero-actions, .product-quick-specs-grid', { autoAlpha: 0, y: 20, clearProps: 'transform' }, 0.38);

      // Section Headings and lead paragraphs reveal
      gsap.utils.toArray('.section-heading, .sector-badge, .active-cs-header, .form-header, .engineering-copy').forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: 30 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power4.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: element, start: 'top 86%', once: true },
          }
        );
      });

      // Staggered card grids
      gsap.utils.toArray(
        '.press-articles-grid, .blog-articles-grid, .case-studies-cards-grid, .dealer-benefits-grid, .culture-grid, .quality-cards-grid, .journey-timeline-grid, .jobs-list, .mission-vision-grid'
      ).forEach((group) => {
        const cards = group.querySelectorAll('article, .journey-card, .job-card, .case-study-card, .quality-card, .dealer-benefit-card, .culture-card, .mission-card');
        if (!cards.length) return;
        gsap.fromTo(
          cards,
          { autoAlpha: 0, y: 36 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power4.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: group, start: 'top 84%', once: true },
          }
        );
      });

      // Process Editorial rows reveal on scroll
      gsap.utils.toArray('.process-editorial-row').forEach((row) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            ease: 'power4.out',
            clearProps: 'transform',
            scrollTrigger: { trigger: row, start: 'top 85%', once: true },
          }
        );
      });

      // One Tree Parallax Image Scroll Effect
      gsap.utils.toArray('.one-tree-full-img').forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -7, scale: 1.05 },
          {
            yPercent: 7,
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: img.closest('.one-tree-section') || img,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          }
        );
      });

      // One Tree Section reveal
      gsap.utils.toArray('.one-tree-split').forEach((split) => {
        const copy = split.querySelector('.one-tree-copy');
        const media = split.querySelector('.one-tree-media-col');
        if (copy) {
          gsap.fromTo(
            copy,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: 'power4.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: split, start: 'top 82%', once: true },
            }
          );
        }
        if (media) {
          gsap.fromTo(
            media,
            { autoAlpha: 0 },
            {
              autoAlpha: 1,
              duration: 1,
              ease: 'power4.out',
              clearProps: 'transform',
              scrollTrigger: { trigger: split, start: 'top 82%', once: true },
            }
          );
        }
      });
    }, scopeRef);

    return () => ctx.revert();
  }, [scopeRef]);
}
