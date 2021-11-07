import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { isMobile } from 'react-device-detect';
import Draggable from 'react-draggable';

import useGameAudio from './../hooks/useGameAudio';
import * as Ingredients from './../components/Ingredients';
import useViewPort from '../hooks/useViewPort';
import { imgs } from '..';

import { updateLives, updateExactOrder } from './../store/status';
import { addIngredientBurger, updateOrders } from './../store/burgers';

const GameIngredients = () => {
  const [{ width }] = useViewPort();

  const IngredientsArray = [
    {
      name: 'Cheese',
      className: 'ing-cheese',
      height: width >= 375 ? 10 : 5,
    },
    {
      name: 'Pickles',
      className: 'ing-pickles',
      height: width >= 375 ? 15 : 10,
    },
    {
      name: 'Lettuce',
      className: 'ing-lettuce',
      height: width >= 375 ? 25 : 10,
    },
    {
      name: 'Tomato',
      className: 'ing-tomato',
      height: width >= 375 ? 30 : 10,
    },
    {
      name: 'Patty',
      className: 'ing-patty',
      height: width >= 375 ? 40 : 20,
    },
    {
      name: 'Bacon',
      className: 'ing-bacon',
      height: width >= 375 ? 20 : 10,
    },
  ];

  return (
    <Ingredients.Container>
      {IngredientsArray.map((ing) => (
        <Ingredients.Item key={ing.name}>
          <DraggableItemIngredient data={ing} />
        </Ingredients.Item>
      ))}
    </Ingredients.Container>
  );
};

const DraggableItemIngredient = ({ data }) => {
  const orders = useSelector((state) => state.burgers.orders, shallowEqual);
  const [dragging, setDragging] = useState(false);
  const { playOnEveryInteraction } = useGameAudio('pop');

  const dispatch = useDispatch();
  const imgSrc = imgs[data.name];

  const [{ opacity }, drag, preview] = useDrag({
    // useDrop の accept　に対応
    type: 'BurgerIngredient',
    item: { name: data.name },
    end: (item, monitor) => {
      // monitor.getDropResult(): useDrop のコンポーネント内の場合は, useDrop の drop プロパティを取得。
      // コンポーネント外にドロップの場合は null。
      if (item && monitor.getDropResult()) {
        const index = orders.findIndex((i) => i.name === data.name);

        if (index === -1) {
          playOnEveryInteraction('incorrect');
          dispatch(updateLives());
          dispatch(updateExactOrder(false));
        } else {
          playOnEveryInteraction();
          dispatch(addIngredientBurger(data));
          dispatch(updateOrders());
        }
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const handleOnStart = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleOnStop = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  if (isMobile) {
    // タッチ操作の場合、 <img/> を 直接 Drag させる。
    return (
      <>
        <Draggable
          defaultPosition={{ x: 300, y: 300 }} // 不要?
          position={{ x: 0, y: 0 }}
          scale={1}
          onStart={handleOnStart}
          onStop={handleOnStop}
        >
          <Ingredients.ItemMobileDragHandler ref={drag}>
            <img
              className={`${dragging ? 'zoom' : ''}`}
              src={imgSrc}
              alt={data.name}
            />
          </Ingredients.ItemMobileDragHandler>
        </Draggable>
      </>
    );
  } else {
    // マウス操作の場合、ドラッグした後 DragPreviewImage を表示
    // 元の <img/> は opacity を 0 にする
    return (
      <>
        <DragPreviewImage connect={preview} src={imgSrc} />
        <img ref={drag} src={imgSrc} alt={data.name} style={{ opacity }} />
      </>
    );
  }
};

export default GameIngredients;
