import React from 'react';
import { config, Transition } from 'react-spring';
import { useDrop } from 'react-dnd';
import * as Burger from '../components/Burger';

import { useAppSelector } from '../app/hooks';
import {
  selectLastBurger,
  selectTotalBurgers,
} from '../features/burgers/burgersSlice';
import { imgs } from '../constants';

const randomAxisX = () => Math.floor(Math.random() * 16) - 8;

const AnimatedBurger = React.memo(() => {
  const lastBurger = useAppSelector(selectLastBurger);
  const [{ canDrop }] = useDrop({
    // useDrag の type　に対応
    accept: 'BurgerIngredient',
    collect: (monitor) => ({
      // type: 'BurgerIngredient' のドラッグが始まったら true を返す
      // canDrop を元にクラス名を追加して、 cssアニメーションで
      // パンを開くアニメーションを実行
      canDrop: monitor.canDrop(),
    }),
  });

  if (lastBurger) {
    return (
      <Burger.Container canDrop={canDrop}>
        <Burger.IngredientsList>
          <Transition
            items={lastBurger.ingredients}
            config={config.wobbly}
            from={{
              x: 0,
              y: -10,
              scale: 1.5,
              height: 0,
              opacity: 0.7,
            }}
            enter={(item) => ({
              x: randomAxisX(),
              y: 0,
              scale: 1,
              height: item.height,
              opacity: 1,
            })}
          >
            {({ height, opacity, x, y, scale }, item, k, i) =>
              item && (
                <Burger.AnimatedIngredient
                  className={item.className}
                  style={{
                    x,
                    y,
                    scale,
                    zIndex: lastBurger.ingredients.length - i,
                    height,
                    opacity,
                  }}
                >
                  <img src={imgs[item.name]} alt={item.name} />
                </Burger.AnimatedIngredient>
              )
            }
          </Transition>
        </Burger.IngredientsList>
      </Burger.Container>
    );
  } else {
    return <div></div>;
  }
});

const GameEmptyBurger = React.memo(() => {
  // ハンバーガーの数が増えると右からスライドイン
  const index = useAppSelector(selectTotalBurgers);
  return (
    <Transition
      items={index}
      config={config.gentle}
      from={{ x: '100%' }}
      enter={{ x: '0%' }}
      leave={{ x: '-100%' }}
    >
      {({ x }, item) =>
        item && (
          <Burger.AnimatedSliderContainer style={{ x }}>
            <AnimatedBurger />
          </Burger.AnimatedSliderContainer>
        )
      }
    </Transition>
  );
});

export default GameEmptyBurger;
