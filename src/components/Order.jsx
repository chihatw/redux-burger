import React, { useState, useEffect, useRef } from 'react';
import { Spring, animated } from 'react-spring';
import { easeBackOut } from 'd3-ease';
import styled from 'styled-components';

import { device } from './../constants';

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

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export const Item = ({ count, children, opacity, scale, x, height }) => {
  const [animate, setAnimate] = useState(false);
  const prevCount = usePrevious(count);

  useEffect(() => {
    let timeout = null;

    if (animate) clearTimeout(timeout);

    if (prevCount > count && count !== 0) {
      setAnimate(true);
    }

    timeout = setTimeout(() => {
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
      <Spring
        config={{ duration: 300, easing: easeBackOut }}
        scale={animate ? 1.3 : 1}
      >
        {({ scale }) => (
          <animated.div
            style={{
              scale,
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
        )}
      </Spring>
    </animated.div>
  );
};
