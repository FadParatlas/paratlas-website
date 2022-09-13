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
          'With No Code',
          1000, 
          () => {
            console.log('Done typing!');
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
          onClick={console.log('hey')}
        >
          Try it out <i className='far fa-play-circle' />
        </Button>
      </div>
      <div className='babylon-app'>
        <Babylonapp />
      </div>
    </div>
  );
}

export default HeroSection;