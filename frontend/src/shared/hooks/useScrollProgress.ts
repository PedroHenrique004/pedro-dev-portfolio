import { useState, useEffect } from 'react';

/**
 * Hook to track scroll progress (0 to 1) of the window or a specific container
 */
export function useScrollProgress(containerRef?: React.RefObject<HTMLElement>): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frameId: number;

    const handleScroll = () => {
      frameId = requestAnimationFrame(() => {
        if (containerRef && containerRef.current) {
          const element = containerRef.current;
          const { scrollTop, scrollHeight, clientHeight } = element;
          const windowHeight = scrollHeight - clientHeight;
          if (windowHeight > 0) {
            setProgress(scrollTop / windowHeight);
          } else {
            setProgress(0);
          }
        } else {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          const windowHeight =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
          if (windowHeight > 0) {
            setProgress(scrollTop / windowHeight);
          } else {
            setProgress(0);
          }
        }
      });
    };

    const target = containerRef?.current || window;
    
    // Initial call
    handleScroll();
    
    target.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      target.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, [containerRef]);

  return progress;
}
