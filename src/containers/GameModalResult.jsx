import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import Modal from './../components/Modal';
import Button from './../components/Button';
import { initializeGame } from './../actions';

const GameModalResult = ({ onExit }) => {
  // redux toolkit の場合、 createReducer? createSlice? を使う
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const score = useSelector((state) => state.gameStatus.score, shallowEqual);
  const lives = useSelector((state) => state.gameStatus.lives, shallowEqual);
  const time = useSelector((state) => state.gameStatus.time, shallowEqual);

  useEffect(() => {
    if (lives === 0 || time === 0) {
      setShowModal(true);
    }
  }, [lives, time, showModal]);

  const handlePlayAgain = () => {
    setShowModal(false);
    dispatch(initializeGame());
  };
  const handleExit = () => {
    onExit();
    setShowModal(false);
    dispatch(initializeGame());
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
