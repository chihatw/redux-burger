import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { animated } from 'react-spring';
import { easeCircleOut } from 'd3-ease';
import Star from '../img/Star.png';
import { Transition } from '@react-spring/core';

const GameStars = () => {
  const numOfBurgers = useSelector(
    (state) => state.burgers.length,
    shallowEqual
  );

  const winStreak = useSelector((state) => state.winStreak, shallowEqual);

  const fewStars = [
    { id: 'star1', x: 20, y: -130, duration: 1 },
    { id: 'star3', x: -100, y: 70, duration: 3 },
    { id: 'star5', x: 130, y: 20, duration: 4 },
  ];

  const manyStars = [
    { id: 'star1', x: 100, y: -130, duration: 1 },
    { id: 'star2', x: -210, y: 220, duration: 2 },
    { id: 'star3', x: 270, y: -210, duration: 3 },
    { id: 'star4', x: 100, y: -130, duration: 1 },
    { id: 'star5', x: 10, y: 220, duration: 4 },
    { id: 'star6', x: -100, y: -210, duration: 3 },
  ];

  const [stars, setStars] = useState([]);

  useEffect(() => {
    const start = performance.now();
    let req;
    // numOfBurgersが 1 以下の時は星を表示しない
    setStars(numOfBurgers > 1 ? (winStreak > 3 ? manyStars : fewStars) : []);

    const resetStars = (timestamp) => {
      if (timestamp - start > 100) {
        setStars([]);
      } else {
        req = requestAnimationFrame(resetStars);
      }
    };
    resetStars();
    return () => cancelAnimationFrame(req);

    // ここにstarを含めたら無限ループになる
    // eslint-disable-next-line
  }, [numOfBurgers]);

  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 100,
        bottom: 300,
        width: 100,
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        background: 'red',
      }}
    >
      <Transition
        items={stars}
        config={{ duration: 2000, easing: easeCircleOut }}
        from={{ x: 0, y: 0, scale: 1.5, opacity: 1 }}
        enter={{ x: 0, y: 0, scale: 1.5, opacity: 1 }}
        leave={(item) => ({ x: item.x, y: item.y, scale: 0, opacity: 0.5 })}
      >
        {({ x, y, scale, opacity }, item) =>
          item && (
            <animated.div
              style={{ position: 'absolute', x, y, scale, opacity }}
            >
              <img
                src={Star}
                alt='Stars'
                style={{
                  width: 100,
                  willChange: 'transform',
                  animation: `star-spin infinite ${item.duration || 5}s linear`,
                }}
              />
            </animated.div>
          )
        }
      </Transition>
    </div>
  );
};

export default GameStars;
