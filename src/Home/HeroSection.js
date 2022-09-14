import React from 'react';
import '../App.css';
import { Button } from '../components/Button';
import './HeroSection.css';
import Babylonapp from '../Babylon/Babylonapp';
import { TypeAnimation } from 'react-type-animation';


function HeroSection() {

  return (
    <div className='hero-container'>
      <TypeAnimation
        sequence={[
          'Create Interactive Visuals', 
          1000,
          'Create Interactive Presentations',
          1000,
          'Create Interactive Animations', 
          3000,
          () => {
            //attach callbacks here
          }
        ]}
        wrapper="h1"
        cursor={true}
        repeat={Infinity}
      />
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
        >
          Demo <i className='far fa-play-circle' />
        </Button>
      </div>
      <div className='babylon-app'>
        <Babylonapp />
      </div>
    </div>
  );
}

export default HeroSection;