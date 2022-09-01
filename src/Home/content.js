import React from 'react'
import { useEffect } from 'react'
import './content.css';

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

  function Content () {
    return (
        <div className='contentWrapper'>
          <h1>Create Interactive Environments</h1>
        </div>
    );
  }

  export default Content;