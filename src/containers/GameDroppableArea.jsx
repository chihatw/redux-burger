import React, { useEffect, useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';

import styled from 'styled-components';

import { serveBurger } from './../actions';
import { device } from './../constants';
import useGameAudio from './../hooks/useGameAudio';

const DroppableContainer = styled.div`
  position: absolute;
  bottom: 140px;
  width: 220px;
  height: 500px;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  z-index: 150;
  -webkit-tap-highlight-color: transparent;

  @media ${device.tablet} {
    bottom: 80px;
  }
`;

function GameDroppableArea() {
  const dispatch = useDispatch();

  const { playOnEveryInteraction } = useGameAudio('serve');

  const ordersComplete = useSelector(
    (state) => state.gameStatus.orders.length === 0,
    shallowEqual
  );

  const serveBurgerCallback = useCallback(
    (res) => {
      if (res) {
        playOnEveryInteraction();
      }
    },
    [playOnEveryInteraction]
  );

  useEffect(() => {
    if (!ordersComplete) return;
    setTimeout(() => {
      dispatch(serveBurger(serveBurgerCallback));
    }, 200);
  }, [dispatch, ordersComplete, serveBurgerCallback]);

  const [, drop] = useDrop({
    accept: 'BurgerIngredient',
    drop: () => ({ name: 'Burger' }),
  });

  return <DroppableContainer className='droppable-area' ref={drop} />;
}

export default GameDroppableArea;
