import React from 'react';
import { useEffect } from 'react';
import '../App.css';
import { Button } from '../components/Button';
import './HeroSection.css';
import Babylonapp from '../Babylon/Babylonapp';
import colors from '../components/css-colors';
import {FadeInSection} from '../components/pages/effects/FadeSection'



function HeroSection() {

  return (
    <div className='hero-container'>
      <h1>Create interactive visuals with no code</h1>
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