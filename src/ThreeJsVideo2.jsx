import React, { useEffect, useRef, useState } from 'react';

const ThreeJsVideo2 = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      const container = containerRef.current;
      if (!video || !container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollY = window.scrollY;

      if (rect.top <= 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }

      // Check if the video is within the viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const scrollStart = scrollY + rect.top - windowHeight;
        const scrollEnd = scrollY + rect.bottom;
        const scrollRange = scrollEnd - scrollStart;

        const videoDuration = video.duration;
        const scrollRelativeToVideo = (scrollY - scrollStart) / scrollRange;
        const newTime = videoDuration * Math.min(Math.max(scrollRelativeToVideo, 0), 1);

        if (scrollY > lastScrollY) {
          // Scrolling down
          video.currentTime = newTime;
        } else {
          // Scrolling up
          video.currentTime = videoDuration - newTime;
        }

        setLastScrollY(scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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
          position: isSticky ? 'fixed' : 'relative',
          top: isSticky ? '0' : 'auto',
          left: isSticky ? '0' : 'auto',
          zIndex: isSticky ? 1000 : 'auto',
          transition: 'position 0.3s ease-in-out',
        }}
      >
        <source src="/Gear.webm" type="video/webm" />
      </video>
    </div>
  );
};

export default ThreeJsVideo2;
