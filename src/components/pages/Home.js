import '../../App.css'
import HeroSection from '../../Home/HeroSection';
import Content from '../../Home/content';
import React from 'react';
import {motion} from 'framer-motion';

function Home() {
    return (
        <motion.div
        initial={{ x: "100%" }}
        animate={{ x: "0%" }}
        className ='home-content-wrapper'>
            <HeroSection className='hero-section' />
        </motion.div>
    )
}

export default Home;
