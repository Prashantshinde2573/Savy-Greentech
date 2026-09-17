import { useEffect } from 'react';

export function SEOHead({ title, description }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | SAVY Greentech Electric Vehicles`;
    }
    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
      }
      metaDesc.content = description;
    }
    window.scrollTo(0, 0);
  }, [title, description]);

  return null;
}
