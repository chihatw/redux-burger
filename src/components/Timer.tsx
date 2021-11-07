import { animated } from 'react-spring';
import styled, { keyframes } from 'styled-components';

import { device } from '../constants';

export const Container = styled(animated.div)`
  position: absolute;
  width: 140px;
  border-radius: 8px;
  background-color: #000;
  text-align: center;
  top: 48px;
  right: 8px;
  z-index: 10;
  background: orange;

  &.danger {
    background: red;
  }

  @media ${device.mobileL} {
    right: 16px;
  }
`;

export const Header = styled.h1`
  text-align: center;
  font-size: 14px;
  color: #fff;
  margin-bottom: 0px;
`;

const pulse = keyframes`
  from {
    transform: scale(2);
  }
  to {
    transform: scale(1);
  }
`;

export const Value = styled(animated.span)`
  text-align: center;
  display: block;
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  padding-bottom: 8px;

  &.pulse {
    animation: ${pulse} 1s ease-out infinite;
  }

  @media ${device.mobileL} {
    font-size: 48px;
  }
`;
