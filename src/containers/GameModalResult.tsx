import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../app/hooks';

import Button from '../components/Button';
import * as Modal from '../components/Modal';
import { useModalHandler } from '../services/modalHandler';

const GameModalResult: React.FC<{ stopAudio: () => void }> = React.memo(
  ({ stopAudio }) => {
    const { handleExit, handleRestart } = useModalHandler({ stopAudio });

    const [showModal, setShowModal] = useState(false);

    const score = useAppSelector((state) => state.status.score);
    const lives = useAppSelector((state) => state.status.lives);
    const time = useAppSelector((state) => state.status.time);

    useEffect(() => {
      if (lives === 0 || time === 0) {
        setShowModal(true);
      }
    }, [lives, time]);

    return (
      <Modal.Window show={showModal}>
        <Modal.Title>
          {lives === 0 ? 'Better luck next time!' : "Time's up!"}
        </Modal.Title>

        <h3 style={{ userSelect: 'none' }}>Your score is:</h3>
        <Modal.ScoreValue>{score}</Modal.ScoreValue>
        <Button
          primary
          onClick={() => {
            setShowModal(false);
            handleRestart();
          }}
        >
          <i className='fa fa-fw fa-play' /> Play again!
        </Button>
        <Button onClick={handleExit}>
          <i className='fa fa-fw fa-sign-out' /> Exit
        </Button>
      </Modal.Window>
    );
  }
);

export default GameModalResult;
