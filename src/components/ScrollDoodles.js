import { useEffect } from 'react';

export const ScrollDoodles = () => {
  useEffect(() => {
    const targets = document.querySelectorAll('.draw-on-scroll');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.3 });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);
  return null;
};
