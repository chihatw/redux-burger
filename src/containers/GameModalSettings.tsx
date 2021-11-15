import React from 'react';
import * as Modal from '../components/Modal';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import Button from '../components/Button';
import { togglePause } from '../features/status/statusSlice';
import { useModalHandler } from '../services/modalHandler';

const GameModalSetting: React.FC<{
  stopAudio: () => void;
}> = React.memo(({ stopAudio }) => {
  const isFocused = useAppSelector((state) => state.status.isFocused);
  const paused = useAppSelector((state) => state.status.paused);
  const dispatch = useAppDispatch();

  const { handleExit, handleRestart } = useModalHandler({ stopAudio });

  const handleTogglePause = () => {
    dispatch(togglePause());
  };

  return (
    <>
      <Modal.Window
        show={paused && isFocused}
        backdropOnClick={handleTogglePause}
      >
        <Modal.Title>What would you like to do?</Modal.Title>
        <Button primary onClick={handleTogglePause}>
          <i className='fa fa-fw fa-play' /> Resume
        </Button>
        <Button onClick={handleRestart}>
          <i className='fa fa-fw fa-repeat' /> Restart
        </Button>
        <Button onClick={handleExit}>
          <i className='fa fa-fw fa-sign-out' /> Exit
        </Button>
      </Modal.Window>
      <Button
        settings
        onClick={handleTogglePause}
        style={{
          position: 'absolute',
          zIndex: 15,
          right: '-3px',
          borderRadius: '8px 0px 0px 8px',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        <i className='fa fa-cog' />
      </Button>
    </>
  );
});

// const GameModalSetting: React.FC<{
//   stopAudio: () => void;
// }> = ({ stopAudio }) => {
//   const isFocused = useAppSelector((state) => state.status.isFocused);
//   const paused = useAppSelector((state) => state.status.paused);
//   const dispatch = useAppDispatch();

//   const { handleExit, handleRestart } = useModalHandler({ stopAudio });

//   const handleTogglePause = () => {
//     dispatch(togglePause());
//   };

//   return (
//     <>
//       <Modal.Window
//         show={paused && isFocused}
//         backdropOnClick={handleTogglePause}
//       >
//         <Modal.Title>What would you like to do?</Modal.Title>
//         <Button primary onClick={handleTogglePause}>
//           <i className='fa fa-fw fa-play' /> Resume
//         </Button>
//         <Button onClick={handleRestart}>
//           <i className='fa fa-fw fa-repeat' /> Restart
//         </Button>
//         <Button onClick={handleExit}>
//           <i className='fa fa-fw fa-sign-out' /> Exit
//         </Button>
//       </Modal.Window>
//       <Button
//         settings
//         onClick={handleTogglePause}
//         style={{
//           position: 'absolute',
//           zIndex: 15,
//           right: '-3px',
//           borderRadius: '8px 0px 0px 8px',
//           top: '50%',
//           transform: 'translateY(-50%)',
//         }}
//       >
//         <i className='fa fa-cog' />
//       </Button>
//     </>
//   );
// };

export default GameModalSetting;
