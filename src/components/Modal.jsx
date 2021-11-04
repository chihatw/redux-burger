import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { Transition, animated, config } from 'react-spring';

const ModalBox = styled.div`
  background-color: #fff;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 16px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-top: 0;
  user-select: none;
`;

export const ScoreValue = styled.h1`
  font-size: 48px;
  margin-top: 0px;
  font-weight: bolder;
  color: #71b413;
  user-select: none;
`;

export const Window = ({ children, show, backdropOnClick }) => {
  const AppContainer = document.querySelector('.App');

  const handleBackdropOnClick = () => {
    backdropOnClick && backdropOnClick();
  };

  // 親要素のDOM階層の外に追加
  return ReactDOM.createPortal(
    <>
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Transition
          items={show}
          config={config.wobbly}
          from={{ scale: 0, opacity: 0 }}
          enter={{ scale: 1, opacity: 1 }}
          leave={{ scale: 0, opacity: 0 }}
        >
          {({ scale, opacity }, item) =>
            item && (
              <animated.div
                style={{
                  scale,
                  opacity,
                  width: 450,
                  zIndex: 300,
                  padding: 16,
                  pointerEvents: 'auto',
                }}
              >
                <ModalBox>{children}</ModalBox>
              </animated.div>
            )
          }
        </Transition>
      </div>
      {show && (
        <div
          style={{
            position: 'absolute',
            zIndex: 200,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          onClick={handleBackdropOnClick}
        />
      )}
    </>,
    AppContainer
  );
};
