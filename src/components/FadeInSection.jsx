import React, { useEffect, useRef, useState } from 'react';
import './FadeInSection.css';

const FadeInSection = ({ children }) => {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(domRef.current);
                }
            });
        }, { threshold: 0.1 });

        observer.observe(domRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div
            className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {children}
        </div>
    );
};

export default FadeInSection;
