import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import gameConstants from './../constants';
import useGameAudio from './../hooks/useGameAudio';

import Timer from './../components/Timer';

const GameTimer = () => {
  const dispatch = useDispatch();
  const { playing, resetCurrentTime, stopAudio, startAudio } =
    useGameAudio('countdown');
  const time = useSelector((state) => state.gameStatus.time, shallowEqual);
  const lives = useSelector((state) => state.gameStatus.lives, shallowEqual);
  const paused = useSelector((state) => state.gameStatus.paused, shallowEqual);

  useEffect(() => {
    let interval = null;

    if (!interval) {
      interval = setInterval(() => {
        if (time > 0 && lives !== 0 && !paused) {
          if (time <= 7 && !playing) {
            startAudio();
          }
          dispatch({ type: gameConstants.UPDATE_TIME, payload: time - 1 });
        } else {
          if (playing) {
            stopAudio();
          }

          resetCurrentTime();
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [
    time,
    lives,
    paused,
    playing,
    dispatch,
    startAudio,
    stopAudio,
    resetCurrentTime,
  ]);

  return (
    <>
      <Timer.Container className={time <= 7 ? 'danger' : ''}>
        <Timer.Header>Remaining Time</Timer.Header>
        <Timer.Value className={time <= 7 && time !== 0 ? 'pulse' : ''}>
          {time === 60 ? '1:00' : `0:${time < 10 ? `0${time}` : time}`}
        </Timer.Value>
      </Timer.Container>
    </>
  );
};

export default GameTimer;
