import React, { useState } from 'react';
import { useDrag, DragPreviewImage } from 'react-dnd';
import { isMobile } from 'react-device-detect';
import Draggable, { DraggableEvent } from 'react-draggable';

import useGameAudio from '../hooks/useGameAudio';
import * as Ingredients from '../components/Ingredients';
import useViewPort from '../hooks/useViewPort';

import { updateLives } from '../features/status/statusSlice';
import { addIngredientToLastBurger } from '../features/burgers/burgersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAllOrders, updateOrders } from '../features/orders/ordersSlice';
import { imgs } from '../constants';

interface Ingredient {
  name: string;
  className: string;
  height: number;
}

const GameIngredients = React.memo(() => {
  const [{ width }] = useViewPort();

  const IngredientsArray: Ingredient[] = [
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
      {IngredientsArray.map((ingredient, index) => (
        <Ingredients.Item key={ingredient.name}>
          <DraggableItemIngredient ingredient={ingredient} />
        </Ingredients.Item>
      ))}
    </Ingredients.Container>
  );
});

const DraggableItemIngredient: React.FC<{
  ingredient: Ingredient;
}> = React.memo(({ ingredient }) => {
  const [dragging, setDragging] = useState(false);
  const orders = useAppSelector(selectAllOrders);
  const { playOnEveryInteraction } = useGameAudio('pop');

  const dispatch = useAppDispatch();
  const imgSrc = imgs[ingredient.name];

  const [{ opacity }, drag, preview] = useDrag({
    // useDrop の accept　に対応
    type: 'BurgerIngredient',
    item: { name: ingredient.name },
    end: (item, monitor) => {
      // monitor.getDropResult(): useDrop のコンポーネント内の場合は, useDrop の drop プロパティを取得。
      // コンポーネント外にドロップの場合は null。
      if (item && monitor.getDropResult()) {
        const _index = orders.findIndex((i) => i.name === ingredient.name);

        if (_index === -1) {
          playOnEveryInteraction('incorrect');
          dispatch(updateLives());
        } else {
          playOnEveryInteraction();
          dispatch(addIngredientToLastBurger(ingredient));
          dispatch(updateOrders(ingredient));
        }
      }
    },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });

  const handleOnDragStart = (e: DraggableEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleOnDragStop = (e: DraggableEvent) => {
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
          onStart={handleOnDragStart}
          onStop={handleOnDragStop}
        >
          <Ingredients.ItemMobileDragHandler ref={drag}>
            <img
              className={`${dragging ? 'zoom' : ''}`}
              src={imgSrc}
              alt={ingredient.name}
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
        <img
          ref={drag}
          src={imgSrc}
          alt={ingredient.name}
          style={{ opacity }}
        />
      </>
    );
  }
});

export default GameIngredients;
