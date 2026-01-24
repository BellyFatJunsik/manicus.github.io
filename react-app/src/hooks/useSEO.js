import { useEffect } from 'react';

export const useSEO = ({ title, description, keywords, ogImage, ogUrl }) => {
  useEffect(() => {
    // Title
    if (title) {
      document.title = title;
    }

    // Meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      if (content) {
        meta.setAttribute('content', content);
      }
    };

    // Description
    if (description) {
      updateMetaTag('description', description);
      updateMetaTag('og:description', description, true);
    }

    // Keywords
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    // Open Graph
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:type', 'website', true);
    if (ogUrl) {
      updateMetaTag('og:url', ogUrl, true);
    }
    if (ogImage) {
      updateMetaTag('og:image', ogImage, true);
    }

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    if (description) {
      updateMetaTag('twitter:description', description);
    }
    if (ogImage) {
      updateMetaTag('twitter:image', ogImage);
    }
  }, [title, description, keywords, ogImage, ogUrl]);
};
