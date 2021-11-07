import * as Timer from './Timer';
import styled from 'styled-components';

import { device } from '../constants';

export const Container = styled(Timer.Container)`
  top: 120px;
  background: #52a2aa;
  @media ${device.mobileL} {
    top: 160px;
  }
`;

export const Header = styled(Timer.Header)``;

export const Value = styled(Timer.Value)``;
