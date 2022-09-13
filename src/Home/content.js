import React from 'react'
import './content.css';
import { FadeInSection } from '../components/pages/effects/FadeSection';
import { TypeAnimation } from 'react-type-animation';

function Content() {
  return (

    <div className='contentWrapper'>
      <FadeInSection>
        <h1>Create Interactive Environments</h1>
      </FadeInSection>

      <TypeAnimation
        sequence={[
          'One', // Types 'One'
          1000, // Waits 1s
          'Two', // Deletes 'One' and types 'Two'
          2000, // Waits 2s
          'Two Three', // Types 'Three' without deleting 'Two'
          () => {
            console.log('Done typing!'); // Place optional callbacks anywhere in the array
          }
        ]}
        wrapper="div"
        cursor={true}
        repeat={Infinity}
        style={{ fontSize: '2em' }}
      />
    </div>
  );
}

export default Content;