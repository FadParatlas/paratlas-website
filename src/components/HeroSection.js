import React from 'react';
import { useEffect } from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import Babylonapp from '../Babylon/Babylonapp';
import colors from './css-colors';

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
      console.log("Fade in");
    });
    observer.observe(domRef.current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
      ref={domRef}
    >
      {props.children}
    </div>
  );
}

function HeroSection() {

  return (
    <div className='hero-container'>
      {/* <h1>Create interactive visuals with no code</h1>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          Learn More
        </Button>
        <Button
          className='btns'
          buttonStyle='btn--primary'
          buttonSize='btn--large'
          onClick={console.log('hey')}
        >
          Try it out <i className='far fa-play-circle' />
        </Button>
      </div> */}
      <div className='babylon-app'>
        <Babylonapp />
      </div>
      <div className='testelement'>
    </div>
    </div>
  );
}

export default HeroSection;