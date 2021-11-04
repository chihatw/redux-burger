import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useTransition, config } from 'react-spring';
import { useDrop } from 'react-dnd';

import Burger from '../components/Burger';

const randomAxisX = () => {
  return Math.floor(Math.random() * 16) - 8;
};

const AnimatedBurger = () => {
  const burgers = useSelector(
    (state) => state.gameStatus.burgers,
    shallowEqual
  );

  const burgerIndex = useSelector(
    (state) => state.gameStatus.burgerIndex,
    shallowEqual
  );

  const [{ canDrop }] = useDrop({
    accept: 'BurgerIngredient',
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
    }),
  });

  const ingredientTransition = useTransition(burgers[burgerIndex].ingredients, {
    config: config.wobbly,
    from: {
      height: 0,
      opacity: 0.7,
      x: 0,
      y: -10,
      scale: 1.5,
    },
    enter: (item) => ({
      height: item.height,
      opacity: 1,
      x: randomAxisX(),
      y: 0,
      scale: 1,
    }),
  });

  return (
    <Burger.Container dragStatus={{ canDrop }}>
      <Burger.IngredientsList>
        {ingredientTransition(
          (styles, item, k, index) =>
            item && (
              <Burger.Ingredient
                className={item.className}
                style={{
                  zIndex: burgers[burgerIndex].ingredients.length - index,
                  ...styles,
                }}
              >
                <img src={require(`../img/${item.name}.png`)} alt={item.name} />
              </Burger.Ingredient>
            )
        )}
      </Burger.IngredientsList>
    </Burger.Container>
  );
};

const GameBurger = () => {
  const burgerIndex = useSelector(
    (state) => state.gameStatus.burgerIndex,
    shallowEqual
  );

  const burgerTransition = useTransition(burgerIndex, {
    config: config.wobbly,
    from: { x: '100%' },
    enter: { x: '0%' },
    leave: { x: '-100%' },
  });

  return (
    <>
      {burgerTransition(
        (styles, item) =>
          Number.isInteger(item) && (
            <Burger.SliderContainer style={styles}>
              <AnimatedBurger />
            </Burger.SliderContainer>
          )
      )}
    </>
  );
};

export default GameBurger;
