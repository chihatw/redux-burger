import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { device } from './../constants';
import useGameAudio from './../hooks/useGameAudio';
import {
  updateWinStreak,
  updateScore,
  updateExactOrder,
} from './../store/status';
import { serveBurger, randomizeOrders } from './../store/burgers';

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

const GameDroppableArea = () => {
  const dispatch = useDispatch(); // store.dispatch と同じ

  const { playOnEveryInteraction } = useGameAudio('serve');

  const ordersComplete = useSelector(
    (state) => state.burgers.orders.length === 0
  );

  const time = useSelector((state) => state.status.time);

  useEffect(() => {
    if (!ordersComplete) return;

    let timerId;
    const flags = { served: false, randomized: false };
    const startTime = performance.now();

    const timer = (timestamp) => {
      const diff = Math.max(timestamp - startTime, 0);
      if (diff > 200 && !flags.served) {
        flags.served = true;
        playOnEveryInteraction();
        dispatch(serveBurger());
        dispatch(updateWinStreak());
        dispatch(updateScore());
        dispatch(updateExactOrder(true));
      }
      if (diff > 500 && !flags.randomized) {
        flags.randomized = true;
        dispatch(randomizeOrders(time));
      }
      timerId = requestAnimationFrame(timer);
    };
    timer(startTime);
    return () => cancelAnimationFrame(timerId);
    // eslint-disable-next-line
  }, [ordersComplete]);

  // drop_0: ドロップ可能なコンポーネントの参照につなげる
  const [, drop] = useDrop({
    // useDrag の type に対応
    accept: 'BurgerIngredient',
    // drop_1: useDrag の monitor.getDropResult() で取得する
    drop: () => ({ name: 'Burger' }),
  });

  return <DroppableContainer className='droppable-area' ref={drop} />;
};

export default GameDroppableArea;
