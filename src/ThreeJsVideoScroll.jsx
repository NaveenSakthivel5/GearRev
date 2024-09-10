import React, { useEffect, useRef } from 'react';

const ThreeJsVideoScroll = () => {
  const videoRef = useRef(null); 
  const containerRef = useRef(null); 
  const lastFrameTime = useRef(0); 
  const isSticky = useRef(false); 

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    const handleMetadataLoaded = () => {
      const fps = 30; 
      const fpsInterval = 1000 / fps;

      const updateVideoFrame = (now) => {
        if (now - lastFrameTime.current >= fpsInterval) {
          lastFrameTime.current = now;

          const scrollPosition = window.scrollY;
          const scrollHeight = document.body.scrollHeight - window.innerHeight;
          const videoDuration = video.duration;
          const containerTop = container.offsetTop;
          const containerHeight = container.offsetHeight;

          const newVideoTime = (scrollPosition / (scrollHeight - containerHeight)) * videoDuration;

          if (video && newVideoTime >= 0 && newVideoTime <= videoDuration) {
            video.currentTime = newVideoTime;
          }

          const viewportHeight = window.innerHeight;
          const videoCenter = containerTop + containerHeight / 2;
          if (videoCenter >= viewportHeight / 2 && videoCenter <= viewportHeight) {
            isSticky.current = true;
            document.body.style.overflowY = 'hidden';
          }

          const isScrolledPast = scrollPosition + window.innerHeight > containerTop + containerHeight;
          if (newVideoTime >= videoDuration && isScrolledPast) {
            isSticky.current = false;
            document.body.style.overflowY = 'auto';
          }
        }

        requestAnimationFrame(updateVideoFrame);
      };

      requestAnimationFrame(updateVideoFrame);
    };

    if (video) {
      video.addEventListener('loadedmetadata', handleMetadataLoaded);
    }

    return () => {
      if (video) video.removeEventListener('loadedmetadata', handleMetadataLoaded);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="video-container"
      style={{
        position: isSticky.current ? 'fixed' : 'relative',
        top: isSticky.current ? '50%' : 'auto',
        transform: isSticky.current ? 'translateY(-50%)' : 'none',
      }}
    >
      <video
        id="background-video-1" 
        ref={videoRef}
        muted
        playsInline
        className="sticky-video"
        onEnded={() => {
          isSticky.current = false;
          document.body.style.overflowY = 'auto';
          const videoCenter = containerTop + containerHeight / 2;
          if (Math.abs(videoCenter - window.innerHeight / 2) < window.innerHeight / 4) {
            isSticky.current = true;
            document.body.style.overflowY = 'hidden';
          }
        }}
      >
        <source src="/GearRev.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default ThreeJsVideoScroll;