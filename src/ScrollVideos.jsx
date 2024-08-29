import React, { useEffect, useRef } from 'react';

// Helper function for smooth easing
const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

// Unified ScrollVideo Component
const ScrollVideo = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const video = videoRef.current;

      if (!video) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the container is in the viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const scrollPosition = window.scrollY;
        const scrollStart = scrollPosition + rect.top - windowHeight;
        const scrollEnd = scrollPosition + rect.bottom;
        const scrollRange = scrollEnd - scrollStart;

        // Calculate the video time based on scroll position
        const videoDuration = video.duration || 1; // Ensure we don't divide by 0
        const scrollRelativeToVideo = (scrollPosition - scrollStart) / scrollRange;
        const targetTime = videoDuration * Math.min(Math.max(scrollRelativeToVideo, 0), 1);

        const delta = targetTime - video.currentTime;
        video.currentTime += delta * 0.1; // Smooth transition
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: '100vh', position: 'relative' }}>
      <video
        ref={videoRef}
        muted
        playsInline
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
};

// Specific Video Components
const ThreeJsVideoScroll = () => <ScrollVideo videoSrc="./gear1.mp4" />;
const ThreeJsVideo2 = () => <ScrollVideo videoSrc="./gear2.mp4" />;

export { ThreeJsVideoScroll, ThreeJsVideo2 };
