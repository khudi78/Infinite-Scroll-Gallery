// src/LazyLoadImage.js
import React, { useRef, useEffect, useState } from 'react';

const Lazyload = ({ src, alt }) => {
  const imgRef = useRef();
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsIntersecting(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isIntersecting ? src : ''}
      alt={alt}
      className="w-[250px] h-[350px] object-cover shadow-xl shadow-slate-700"
      loading="lazy"
    />
  );
};

export default Lazyload;
