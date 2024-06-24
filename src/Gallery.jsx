// src/InfiniteScrollGallery.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Lazyload from './Lazyload';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  const fetchImages = useCallback(async () => {
    const response = await fetch(`https://api.unsplash.com/photos/?client_id=mqjxIlOz3NUKX-5B1lZz50eEDXaNBo6Z48i53ta_Azg&page=${page}&per_page=10`);
    const data = await response.json();
    setImages((prev) => [...prev, ...data]);
  }, [page]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage((prev) => prev + 1);
      }
    }, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 w-[1300px]">
      <div className="grid grid-cols-2 lg:ml-[-10px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-16 md:gap-y-16 sm:gap-y-16 lg:w-[1200px] md:w-[700px] sm:gap-x-16 sm:ml-[50px] sm:w-[490px] max-[640px]:gap-y-16 max-[640px]:ml-[100px]">
        {images.map((image, index) => (
          <Lazyload
            key={index}
            src={image.urls.small}
            alt={image.title}
          />
        ))}
      </div>
      <div ref={loader} className="loading mt-4">
        <p>Loading more images...</p>
      </div>
    </div>
  );
};

export default Gallery;
