import '../../App.css'
import HeroSection from '../../Home/HeroSection';
import Content from '../../Home/content';
import React from 'react'

function Home() {
    return (
        <div className='home-content-wrapper'>
            <HeroSection className='hero-section' />
            <Content className='content-section' />
        </div>
    )
}

export default Home;
