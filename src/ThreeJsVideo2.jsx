
import React, { useEffect, useRef } from 'react';

const ThreeJsVideo2 = () => {
  const videoRef = useRef(null);
  const lastFrameTime = useRef(0);  // Track the time of the last frame
  const targetVideoTime = useRef(0);  // Target video time for easing
  const currentVideoTime = useRef(0);  // Current video time for easing

  useEffect(() => {
    const video = videoRef.current;

    const onMetadataLoaded = () => {
      const fps = 30;  // Target frames per second
      const fpsInterval = 0 / fps;

      const easeInOutQuad = (t) => {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      };

      const updateVideoFrame = (now) => {
        if (now - lastFrameTime.current >= fpsInterval) {
          lastFrameTime.current = now;

          const scrollPosition = window.scrollY;
          const scrollHeight = document.body.scrollHeight - window.innerHeight;
          const videoDuration = video.duration;

          targetVideoTime.current = (scrollPosition / scrollHeight) * videoDuration;

          // Apply faster easing to the video time transition
          const delta = targetVideoTime.current - currentVideoTime.current;
          currentVideoTime.current += delta * easeInOutQuad(0.4);  // Adjusted to 0.4 for faster easing
          video.currentTime = currentVideoTime.current;
        }
        requestAnimationFrame(updateVideoFrame);
      };

      // Start the animation loop for scroll
      requestAnimationFrame(updateVideoFrame);
    };

    // Add metadata loaded event listener
    if (video) {
      video.addEventListener('loadedmetadata', onMetadataLoaded);
    }

    // Clean up event listener on unmount
    return () => {
      if (video) {
        video.removeEventListener('loadedmetadata', onMetadataLoaded);
      }
    };
  }, []);

  return (
    <video
      id="background-video"
      ref={videoRef}
      muted
      playsInline
      style={{ width: '100%', height: 'auto' }}
    >
      <source src="/GearRev.mp4" type="video/mp4" />
    </video>
  );
};

export default ThreeJsVideo2;