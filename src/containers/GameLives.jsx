import React from 'react';

import { useSelector, shallowEqual } from 'react-redux';
import { config, Transition } from 'react-spring';

import * as Lives from './../components/Lives';
import Heart from './../img/Heart.svg';

const GameLives = () => {
  const lives = useSelector((state) => state.gameStatus.lives, shallowEqual);

  return (
    <Lives.Container>
      <Transition
        items={[...new Array(lives).keys()]} // [0, 1, 2]
        config={config.wobbly}
        from={{ scale: 0, opacity: 1 }}
        enter={{ scale: 1, opacity: 1 }}
        leave={{ scale: 0, opacity: 0 }}
      >
        {(styles, item) =>
          Number.isInteger(item) && (
            <Lives.Heart style={styles}>
              <img src={Heart} alt='Heart' />
            </Lives.Heart>
          )
        }
      </Transition>
    </Lives.Container>
  );
};

export default GameLives;
