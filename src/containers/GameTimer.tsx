import React, { useEffect } from 'react';

import useGameAudio from '../hooks/useGameAudio';

import * as Timer from '../components/Timer';
import { updateTime } from '../features/status/statusSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const GameTimer = () => {
  const dispatch = useAppDispatch();
  const { playing, resetCurrentTime, stopAudio, startAudio } =
    useGameAudio('countdown');
  const time = useAppSelector((state) => state.status.time);
  const lives = useAppSelector((state) => state.status.lives);
  const paused = useAppSelector((state) => state.status.paused);

  useEffect(() => {
    let interval = 0;

    if (!interval) {
      interval = window.setInterval(() => {
        if (time > 0 && lives !== 0 && !paused) {
          time <= 7 && !playing && startAudio();
          dispatch(updateTime());
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
