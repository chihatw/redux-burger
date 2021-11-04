import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { useTransition, animated as a, config } from 'react-spring';

const Backdrop = styled.div`
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled(a.div)`
  position: absolute;
  box-sizing: border-box;
  width: 450px;
  max-width: 100%;
  max-height: 100%;
  padding: 16px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 300;
`;

const ModalBox = styled.div`
  background-color: #fff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 0;
  user-select: none;
`;

const ScoreValue = styled.h1`
  font-size: 48px;
  margin-top: 0px;
  font-weight: bolder;
  color: #71b413;
  user-select: none;
`;

const Window = ({ children, show, backdropOnClick }) => {
  const AppContainer = document.querySelector('.App');

  const modalTransition = useTransition(show, {
    config: config.wobbly,
    from: { scale: 0, opacity: 0 },
    enter: { scale: 1, opacity: 1 },
    leave: { scale: 0, opacity: 0 },
  });

  const handleBackdropOnClick = () => {
    backdropOnClick && backdropOnClick();
  };

  // 親要素のDOM階層の外に追加
  return ReactDOM.createPortal(
    <>
      {modalTransition(
        (styles, item) =>
          item && (
            <ModalContainer style={{ ...styles, x: '-50%', y: '-50%' }}>
              <ModalBox>{children}</ModalBox>
            </ModalContainer>
          )
      )}
      {show && <Backdrop onClick={handleBackdropOnClick} />}
    </>,
    AppContainer
  );
};

export default { Window, Title, ScoreValue };
