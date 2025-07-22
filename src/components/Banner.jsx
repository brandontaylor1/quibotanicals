import React, { useEffect } from 'react';
import '../index.css'; // Assuming you have a CSS file for the banner styles

const Banner = ({backgroundColor, color, top, left}) => {
  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('.featured-producer-section');
      const banner = document.querySelector('.banner');
      if (section && banner) {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionHeight = section.offsetHeight;

        // Only move the banner if the section is in view
        if (sectionTop < window.innerHeight && sectionTop + sectionHeight > 0) {
          const scrollPosition = Math.max(0, window.innerHeight - sectionTop);
          banner.style.transform = `translateX(${scrollPosition * 0.5}px)`; // Adjust speed with multiplier
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
  <div className="banner"
        style={{
            backgroundColor: backgroundColor,
            color: color,
            top: top,
            left: left,
        }}
  ><p style={{textAlign: 'center'}}>
        QUIBOTANICALS * FEATURED PRODUCER * QUIBOTANICALS
    </p>
    </div>
    )
};

export default Banner;