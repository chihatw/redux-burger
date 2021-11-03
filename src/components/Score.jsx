import Timer from './Timer';
import styled from 'styled-components';

import { device } from './../constants';

const Container = styled(Timer.Container)`
  top: 120px;
  background: #52a2aa;
  @media ${device.mobileL} {
    top: 160px;
  }
`;

const Header = styled(Timer.Header)``;

const Value = styled(Timer.Value)``;

export default { Container, Header, Value };
