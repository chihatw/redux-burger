import React from 'react';
import { shallowEqual } from 'react-redux';
import { config, Transition } from 'react-spring';
import { useDrop } from 'react-dnd';
import * as Burger from '../components/Burger';
import { imgs } from '..';
import { useAppSelector } from '../app/hooks';

const randomAxisX = () => Math.floor(Math.random() * 16) - 8;

const AnimatedBurger = () => {
  const index = useAppSelector((state) => state.status.index);
  const burgers = useAppSelector((state) => state.burgers, shallowEqual);

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

  return (
    <Burger.Container dragStatus={{ canDrop }}>
      <Burger.IngredientsList>
        <Transition
          items={burgers[index]}
          config={config.wobbly}
          from={{ height: 0, opacity: 0.7, x: 0, y: -10, scale: 1.5 }}
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
              <Burger.Ingredient
                className={item.className}
                style={{
                  x,
                  y,
                  scale,
                  zIndex: burgers[index].length - i,
                  height,
                  opacity,
                }}
              >
                <img src={imgs[item.name]} alt={item.name} />
              </Burger.Ingredient>
            )
          }
        </Transition>
      </Burger.IngredientsList>
    </Burger.Container>
  );
};

const GameBurger = () => {
  const index = useAppSelector((state) => state.status.index);

  return (
    <Transition
      items={index}
      config={config.wobbly}
      from={{ x: '100%' }}
      enter={{ x: '0%' }}
      leave={{ x: '-100%' }}
    >
      {({ x }, item) =>
        Number.isInteger(item) && (
          <Burger.SliderContainer style={{ x }}>
            <AnimatedBurger />
          </Burger.SliderContainer>
        )
      }
    </Transition>
  );
};

export default GameBurger;
