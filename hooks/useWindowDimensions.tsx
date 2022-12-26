/* eslint-disable no-shadow */
import { useEffect, useState } from 'react';

export function useWindowDimensions() {
  let width;
  let height;
  if (typeof window !== 'undefined') {
    width = window.innerWidth;
    height = window.innerHeight;
  } else {
    width = 0;
    height = 0;
  }

  const [windowDimensions, setWindowDimensions] = useState({
    width,
    height,
  });

  useEffect(() => {
    function getWindowDimensions() {
      const { innerWidth: width, innerHeight: height } = window;
      return {
        width,
        height,
      };
    }
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
