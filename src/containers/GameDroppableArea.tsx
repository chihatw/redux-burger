import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';

import { device } from '../constants';
import useGameAudio from '../hooks/useGameAudio';
import { updateScore } from '../features/status/statusSlice';
import { serveBurger, randomizeOrders } from '../features/burgers/burgersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

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
  const dispatch = useAppDispatch();

  const { playOnEveryInteraction } = useGameAudio('serve');

  const ordersComplete = useAppSelector(
    (state) => state.burgers.orders.length === 0
  );

  const time = useAppSelector((state) => state.status.time);

  useEffect(() => {
    if (!ordersComplete) return;

    let timerId = 0;
    const flags = { served: false, randomized: false };
    const startTime = performance.now();

    const timer = (timestamp: number) => {
      const diff = Math.max(timestamp - startTime, 0);
      if (diff > 200 && !flags.served) {
        flags.served = true;
        playOnEveryInteraction();
        dispatch(serveBurger());
        dispatch(updateScore());
      }
      if (diff > 500 && !flags.randomized) {
        flags.randomized = true;
        dispatch(randomizeOrders(time));
      }
      timerId = requestAnimationFrame(timer);
    };
    timer(startTime);
    return () => cancelAnimationFrame(timerId);
    // ordersComplete 以外の変化は無視
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
