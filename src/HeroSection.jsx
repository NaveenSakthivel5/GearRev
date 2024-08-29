import React from 'react';
import './HeroSection.css';

function HeroSection() {
  const animateText = (text) => {
    return text.split("").map((letter, index) => (
      <span
        key={index}
        className="letter"
        style={{ '--letter-index': index }}
      >
        {letter}
      </span>
    ));
  };

  return (
    <section className="hero">
      <h1>
        {animateText("MAKING SPACE")}<br />
        {animateText("UNIVERSALLY")}<br />
        {animateText("ACCESSIBLE")}
      </h1>
      <p>{animateText("We engineer, build and operate exceptional satellites")}</p>

     
    </section>
  );
}

export default HeroSection;
