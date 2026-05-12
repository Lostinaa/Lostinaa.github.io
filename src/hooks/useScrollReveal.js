import { useEffect, useRef } from 'react';

/**
 * Custom hook for scroll-triggered reveal animations using IntersectionObserver.
 * Adds the 'revealed' class when the element enters the viewport.
 *
 * @param {Object} options
 * @param {number} options.threshold - Visibility threshold (0-1) to trigger
 * @param {string} options.rootMargin - Margin around root element
 * @param {boolean} options.once - If true, only reveal once (default: true)
 */
export function useScrollReveal({
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            entry.target.classList.remove('revealed');
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return ref;
}

/**
 * Applies scroll-reveal to multiple children of a container.
 * Each child gets a staggered delay.
 *
 * @param {Object} options
 * @param {number} options.staggerMs - Delay between each child's reveal
 * @param {number} options.threshold - Visibility threshold
 */
export function useStaggerReveal({
  staggerMs = 100,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    children.forEach((child, index) => {
      child.style.transitionDelay = `${index * staggerMs}ms`;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            children.forEach((child) => {
              child.classList.add('revealed');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, [staggerMs, threshold, rootMargin]);

  return ref;
}
