import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import * as Modal from './../components/Modal';
import Button from './../components/Button';
import * as actions from './../store/gameStatus';
import * as helpers from './../helpers';

const GameModalResult = ({ onExit }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const score = useSelector((state) => state.score, shallowEqual);
  const lives = useSelector((state) => state.lives, shallowEqual);
  const time = useSelector((state) => state.time, shallowEqual);

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
    dispatch(actions.setLoading());
    helpers.setTimeoutWithRequestAnimationFrame(() => {
      dispatch(actions.initialize());
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
