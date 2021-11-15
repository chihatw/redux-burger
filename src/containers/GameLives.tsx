import React from 'react';

import { config, Transition } from 'react-spring';
import { useAppSelector } from '../app/hooks';

import * as Lives from '../components/Lives';
import { selectLivesArray } from '../features/status/statusSlice';
import Heart from './../img/Heart.svg';

const GameLives = React.memo(() => {
  const items = useAppSelector(selectLivesArray);
  return (
    <Lives.Container>
      <Transition
        items={items}
        config={config.wobbly}
        from={{ scale: 0, opacity: 1 }}
        enter={{ scale: 1, opacity: 1 }}
        leave={{ scale: 0, opacity: 0 }}
      >
        {(styles, item) =>
          item && (
            <Lives.Heart style={styles}>
              <img src={Heart} alt='Heart' />
            </Lives.Heart>
          )
        }
      </Transition>
    </Lives.Container>
  );
});

export default GameLives;
