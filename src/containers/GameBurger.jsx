import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { config, Transition } from 'react-spring';
import { useDrop } from 'react-dnd';
import * as Burger from '../components/Burger';
import { imgs } from '..';

const randomAxisX = () => {
  return Math.floor(Math.random() * 16) - 8;
};

const AnimatedBurger = () => {
  const burgers = useSelector((state) => state.burgers, shallowEqual);

  const burgerIndex = useSelector((state) => state.burgerIndex, shallowEqual);

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
          items={burgers[burgerIndex].ingredients}
          config={config.wobbly}
          from={{ height: 0, opacity: 0.7, x: 0, y: -10, scale: 1.5 }}
          enter={(item) => ({
            height: item.height,
            opacity: 1,
            x: randomAxisX(),
            y: 0,
            scale: 1,
          })}
        >
          {({ height, opacity, x, y, scale }, item, k, index) =>
            item && (
              <Burger.Ingredient
                className={item.className}
                style={{
                  zIndex: burgers[burgerIndex].ingredients.length - index,
                  height,
                  opacity,
                  x,
                  y,
                  scale,
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
  const burgerIndex = useSelector((state) => state.burgerIndex, shallowEqual);

  return (
    <>
      <Transition
        items={burgerIndex}
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
    </>
  );
};

export default GameBurger;
