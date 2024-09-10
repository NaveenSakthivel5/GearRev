import React from 'react';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import './App.css';
import ThreeJsVideoScroll from './ThreeJsVideoScroll';
import ThreeJsVideo2 from './ThreeJsVideo2';
import SmoothScrollVideo from './SmoothScrollVideo';

function App() {
  return (
    <div className="app-container">
      <PageOne />
      
      <ThreeJsVideoScroll />
      {/* <ThreeJsVideo2 /> */}
      <PageTwo />
      <PageTwo/>
      <PageTwo/>
    </div>
  );
}

export default App;
