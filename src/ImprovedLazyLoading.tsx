import { useEffect, useState } from 'react';

export default function ImprovedLazyLoading() {
  const [images, setImages] = useState([]);
  const [isImagesLoaded, setIsImagesLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://picsum.photos/v2/list');
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error('Failed to fetch images:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      let loadedCount = 0;

      images.forEach((image) => {
        const img = new Image();
        img.src = image.download_url;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === images.length) {
            setIsImagesLoaded(true);
          }
        };
        img.onerror = () => {
          // Even if an image fails, we can still move forward
          loadedCount++;
          if (loadedCount === images.length) {
            setIsImagesLoaded(true);
          }
        };
      });
    }
  }, [images]);

  if (!isImagesLoaded) {
    return <p><i>Loading images...</i></p>;
  }

  const renderedImages = images.map((image) => (
    <img
      key={image.id}
      src={image.download_url}
      alt={`Image by ${image.author}`}
      width="200px"
      height="auto"
    />
  ));

  return <>{renderedImages}</>;
}


// Suspense shows the loading UI until LoadBigData.tsx is loaded.

// Then LoadBigData shows its own <p>Loading images...</p> until all images are visually loaded in the browser.

// Once they’re fully ready, it renders the actual <img> elements.