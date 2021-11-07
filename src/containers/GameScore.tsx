import React from 'react';
import { useSpring } from 'react-spring';
import { useAppSelector } from '../app/hooks';

import * as Score from '../components/Score';

const GameScore = () => {
  const score = useAppSelector((state) => state.status.score);
  const animatedScore = useSpring({ value: score, from: { value: 0 } });

  return (
    <>
      <Score.Container>
        <Score.Header>Your score</Score.Header>
        <Score.Value>{animatedScore.value.to((x) => x.toFixed(0))}</Score.Value>
      </Score.Container>
    </>
  );
};

export default GameScore;
