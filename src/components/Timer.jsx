import { animated as a } from 'react-spring';
import styled, { keyframes } from 'styled-components';

import { device } from './../constants';

const Container = styled(a.div)`
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

const Header = styled.h1`
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

const Value = styled(a.span)`
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

export default { Container, Header, Value };
