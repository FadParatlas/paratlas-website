import React from 'react';
import '../App.css';
import { Button } from './Button';
import './HeroSection.css';
import Babylonapp from '../Babylon/Babylonapp';

function HeroSection() {
    return (
        <div className='hero-container'>
            <div className='babylon-app'>
                <Babylonapp />
            </div>
            <h1>Lucas 10 inch cock</h1>
            <p>smd</p>
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
                    Play Game <i className='far fa-play-circle' />
                </Button>
            </div>
        </div>
    );
}

export default HeroSection;