import React from 'react';
import HeroSection from './HeroSection';
import ThreeJsVideoScroll from './ThreeJsVideoScroll';
import './HeroSection.css';

const PageThree = () => {
  return (
    <div className="page-three-container">
      <div className="left-side">
        <ThreeJsVideoScroll />
      </div>
      <div className="right-side mirrored-section">
        <HeroSection
          title1="GLOBAL COVERAGE"
          title2="WITH OUR"
          title3="SATELLITES"
          subtitle="Expanding connectivity across the world"
        />
      </div>
    </div>
  );
};

export default PageThree;
