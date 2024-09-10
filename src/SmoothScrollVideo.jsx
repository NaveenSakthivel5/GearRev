// src/SmoothScrollVideo.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SmoothScrollVideo = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => { 
    const video = videoRef.current;
    if (!video) return;

    // GSAP ScrollTrigger setup
    const scrollTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 80%',  // Start when the top of the video is 80% from the top of the viewport
      end: 'bottom 20%', // End when the bottom of the video is 20% from the top of the viewport
      scrub: true,
      onUpdate: (self) => {
        if (video.duration) {
          const progress = self.progress;
          video.currentTime = progress * video.duration;
        }
      },
    });

    // Clean up
    return () => {
      scrollTrigger.kill();
    };
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: '200vh', position: 'relative' }}>
      <video
        ref={videoRef}
        muted
        playsInline
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
        }}
        preload="metadata"
      >
        <source src="/Gearfinal.webm" type="video/webm" />
      </video>
    </div>
  );
};

export default SmoothScrollVideo;
