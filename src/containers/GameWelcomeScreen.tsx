import React from 'react';
import styled from 'styled-components';

import { device } from '../constants';
import Flash from './../img/Flash.png';

import Button from '../components/Button';
import { useAppDispatch } from '../app/hooks';
import { hideWelcomeScreen } from '../features/status/statusSlice';

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  user-select: none;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
    display: inline-block;
    max-width: 500px;
  }

  @media ${device.tablet} {
    max-width: 640px;
    max-height: 640px;
  }
`;

const GameWelcomeScreen: React.FC<{
  startAudio: () => void;
}> = ({ startAudio }) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    startAudio();
    dispatch(hideWelcomeScreen());
  };
  return (
    <Container>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <img src={Flash} alt='Flash' />
        <div>
          <Button primary onClick={handleClick}>
            Start game
          </Button>
        </div>
        <div style={{ height: 30 }} />
      </div>
    </Container>
  );
};

export default GameWelcomeScreen;
