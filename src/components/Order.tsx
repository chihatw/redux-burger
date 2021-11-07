import React, { useState, useEffect, useRef } from 'react';
import { animated, useSpring } from 'react-spring';
import { easeBackOut } from 'd3-ease';
import styled from 'styled-components';

import { device } from '../constants';

export const Container = styled.div`
  position: absolute;
  width: 140px;
  top: 48px;
  left: 8px;
  z-index: 10;
  @media ${device.mobileL} {
    left: 16px;
    width: 180px;
  }
`;

const usePrevious = (value: number) => {
  const ref = useRef<number>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export const Item: React.FC<{
  count: number;
  opacity: number;
  scale: number;
  x: string;
  height: number;
}> = ({ count, children, opacity, scale, x, height }) => {
  const [animate, setAnimate] = useState(false);
  const prevCount = usePrevious(count);

  const { scale: bounceScale } = useSpring({
    scale: animate ? 1.3 : 1.0,
    config: { duration: 300, easing: easeBackOut },
  });

  useEffect(() => {
    let timeout = 0;

    if (animate) clearTimeout(timeout);

    if (prevCount && prevCount > count && count !== 0) {
      setAnimate(true);
    }

    timeout = window.setTimeout(() => {
      setAnimate(false);
    }, 200);

    return () => clearTimeout(timeout);
  }, [count, prevCount, animate]);

  return (
    <animated.div
      style={{
        x,
        scale,
        height,
        opacity,
        width: '100%',
        position: 'relative',
        overflow: 'visible',
        willChange: 'transform, height, opacity',
      }}
    >
      <animated.div
        style={{
          scale: bounceScale,
          padding: 8,
          outline: '#ccc solid 1px',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 8,
          backgroundColor: '#fff',
        }}
      >
        {children}
      </animated.div>
    </animated.div>
  );
};
