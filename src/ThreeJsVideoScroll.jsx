import React, { useEffect, useRef } from 'react';

const ThreeJsVideoScroll = () => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current;
      if (!video) return;

      const rect = video.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Check if the video is within the viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const scrollPosition = window.scrollY;
        const scrollStart = scrollPosition + rect.top - windowHeight;
        const scrollEnd = scrollPosition + rect.bottom;
        const scrollRange = scrollEnd - scrollStart;

        const videoDuration = video.duration;
        const scrollRelativeToVideo = (scrollPosition - scrollStart) / scrollRange;
        const newTime = videoDuration * Math.min(Math.max(scrollRelativeToVideo, 0), 1);

        // Update the video current time
        video.currentTime = newTime;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
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
        <source src="/Gear.webm" type="video/webm" />
      </video>
    </div>
  );
};

export default ThreeJsVideoScroll;
