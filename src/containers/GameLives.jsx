import React from 'react';

import { useSelector, shallowEqual } from 'react-redux';
import { useTransition, config } from 'react-spring';

import Lives from './../components/Lives';
import Heart from './../img/Heart.svg';

const GameLives = () => {
  const lives = useSelector((state) => state.gameStatus.lives, shallowEqual);

  const heartTransition = useTransition(
    [...new Array(lives).keys()], // [0, 1, 2]
    (item) => item,
    {
      config: config.wobbly,
      from: { transform: 'scale(0)', opacity: 1 },
      enter: { transform: 'scale(1)', opacity: 1 },
      leave: { transform: 'scale(0)', opacity: 0 },
    }
  );

  return (
    <Lives.Container>
      {heartTransition.map(({ props, key }) => (
        <Lives.Heart style={props} key={key}>
          <img src={Heart} alt='Heart' />
        </Lives.Heart>
      ))}
    </Lives.Container>
  );
};

export default GameLives;
