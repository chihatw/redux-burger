import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated as a } from 'react-spring';
import { easeBackOut } from 'd3-ease';
import styled from 'styled-components';

import { device } from './../constants';

const Container = styled(a.div)`
  position: absolute;
  width: 140px;
  display: flex;
  flex-direction: column;
  top: 48px;
  left: 8px;
  z-index: 10;
  @media ${device.mobileL} {
    left: 16px;
    width: 180px;
  }
`;

const ItemWrapper = styled(a.div)`
  width: 100%;
  height: 44px;
  position: relative;
  overflow: visible;
  will-change: transform, height, opacity;
`;

const ItemContent = styled(a.div)`
  background-color: #fff;
  outline: #ccc solid 1px;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 8px;
`;

const usePrevious = (value) => {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

const Item = ({ style, count, children }) => {
  const [animate, setAnimate] = useState(false);
  const prevCount = usePrevious(count);

  const contentProps = useSpring({
    config: {
      duration: 300,
      easing: easeBackOut,
    },
    transform: animate ? 'scale(1.3)' : 'scale(1)',
  });

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
    <ItemWrapper style={{ ...style }}>
      <ItemContent style={contentProps}>{children}</ItemContent>
    </ItemWrapper>
  );
};

export default { Container, Item };
