import React, { useState, useEffect } from 'react';
import * as Modal from '../components/Modal';
import Button from '../components/Button';
import { setLoading, initializeStatus } from '../features/status/statusSlice';
import { initializeBurgers } from '../features/burgers/burgersSlice';
import * as helpers from '../helpers';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const GameModalResult: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);

  const score = useAppSelector((state) => state.status.score);
  const lives = useAppSelector((state) => state.status.lives);
  const time = useAppSelector((state) => state.status.time);

  useEffect(() => {
    if (lives === 0 || time === 0) {
      setShowModal(true);
    }
  }, [lives, time]);

  const handlePlayAgain = () => {
    gameInitialize();
  };
  const handleExit = () => {
    onExit();
    gameInitialize();
  };

  const gameInitialize = () => {
    setShowModal(false);
    dispatch(setLoading());
    helpers.setTimeoutWithRequestAnimationFrame(() => {
      dispatch(initializeStatus());
      dispatch(initializeBurgers());
    }, 100);
  };

  return (
    <Modal.Window show={showModal}>
      <Modal.Title>
        {lives === 0 ? 'Better luck next time!' : "Time's up!"}
      </Modal.Title>

      <h3 style={{ userSelect: 'none' }}>Your score is:</h3>
      <Modal.ScoreValue>{score}</Modal.ScoreValue>
      <Button primary onClick={handlePlayAgain}>
        <i className='fa fa-fw fa-play' /> Play again!
      </Button>
      <Button onClick={handleExit}>
        <i className='fa fa-fw fa-sign-out' /> Exit
      </Button>
    </Modal.Window>
  );
};

export default GameModalResult;
