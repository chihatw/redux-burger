import React, { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import useGameAudio from './../hooks/useGameAudio';

import * as Timer from './../components/Timer';
import * as actions from './../store/gameStatus';

const GameTimer = () => {
  const dispatch = useDispatch();
  const { playing, resetCurrentTime, stopAudio, startAudio } =
    useGameAudio('countdown');
  const time = useSelector((state) => state.time, shallowEqual);
  const lives = useSelector((state) => state.lives, shallowEqual);
  const paused = useSelector((state) => state.paused, shallowEqual);

  useEffect(() => {
    let interval = null;

    if (!interval) {
      interval = setInterval(() => {
        if (time > 0 && lives !== 0 && !paused) {
          time <= 7 && !playing && startAudio();
          dispatch(actions.updateTime());
        } else {
          playing && stopAudio();
          resetCurrentTime();
          clearInterval(interval);
        }
      }, 1000);
    }

    return () => void clearInterval(interval);
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
