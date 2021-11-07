import { useEffect, useState, useCallback } from 'react';

const useViewPort = () => {
  const height = window.innerHeight;
  const width = window.innerWidth;
  const [windowDimensions, setWindowDimensions] = useState({ height, width });

  const deriveWindowDimensions = useCallback(() => {
    setWindowDimensions({ height, width });
  }, [height, width]);

  useEffect(() => {
    deriveWindowDimensions();
    window.addEventListener('resize', deriveWindowDimensions);

    return () => {
      window.removeEventListener('resize', deriveWindowDimensions);
    };
  }, [height, width, deriveWindowDimensions]);

  return [windowDimensions];
};

export default useViewPort;
