import React from 'react'
import './content.css';
import { FadeInSection } from '../components/pages/effects/FadeSection';
import {motion} from 'framer-motion';

function Content() {
  return (

    <div className='contentWrapper'>
      <FadeInSection>
        <h1>Create Interactive Environments</h1>
      </FadeInSection>
    </div>
  );
}

export default Content;