import { useState } from 'react';

import './ScrollToTop.css';


const ScrollButton  = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;

        if (scrolled > 300) {
            setVisible(true);
        } else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div className="scroll-to-top"
             onClick={ scrollToTop }
             style={{ display: visible ? 'flex' : 'none' }}
        >
            <span>&#129093;</span>
        </div>
    )
}

export default ScrollButton;