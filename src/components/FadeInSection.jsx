import React, { useEffect, useRef, useState } from 'react';

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
            className={`transition-all duration-600 ease-out will-change-[opacity,visibility] ${isVisible ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-[10px] invisible'}`}
            ref={domRef}
        >
            {children}
        </div>
    );
};

export default FadeInSection;
