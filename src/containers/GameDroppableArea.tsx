import React from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';

import { device } from '../constants';

const DroppableContainer = styled.div`
  position: absolute;
  bottom: 140px;
  width: 220px;
  height: 500px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 150;
  -webkit-tap-highlight-color: transparent;

  @media ${device.tablet} {
    bottom: 80px;
  }
`;

const GameDroppableArea = React.memo(() => {
  const [, dropTargetRef] = useDrop({
    // useDrag の type に対応
    accept: 'BurgerIngredient',
    // useDrag の monitor.getDropResult() で取得する
    drop: () => ({ name: 'Burger' }),
  });

  return <DroppableContainer className='droppable-area' ref={dropTargetRef} />;
});

export default GameDroppableArea;
