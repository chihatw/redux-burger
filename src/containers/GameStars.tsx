import React, { useState, useEffect } from 'react';
import { animated } from 'react-spring';
import { easeCircleOut } from 'd3-ease';
import StarImg from '../img/Star.png';
import { Transition } from '@react-spring/core';
import { useAppSelector } from '../app/hooks';
import { selectTotalBurgers } from '../features/burgers/burgersSlice';

type Star = {
  id: string;
  x: number;
  y: number;
  duration: number;
};

const fewStars: Star[] = [
  { id: 'star1', x: 20, y: -130, duration: 1 },
  { id: 'star3', x: -100, y: 70, duration: 3 },
  { id: 'star5', x: 130, y: 20, duration: 4 },
];

const manyStars: Star[] = [
  { id: 'star1', x: 100, y: -130, duration: 1 },
  { id: 'star2', x: -210, y: 220, duration: 2 },
  { id: 'star3', x: 270, y: -210, duration: 3 },
  { id: 'star4', x: 100, y: -130, duration: 1 },
  { id: 'star5', x: 10, y: 220, duration: 4 },
  { id: 'star6', x: -100, y: -210, duration: 3 },
];

const GameStars = React.memo(() => {
  const numOfBurgers = useAppSelector(selectTotalBurgers);
  const winStreak = useAppSelector((state) => state.status.winStreak);

  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const start = performance.now();
    let req = 0;
    // numOfBurgersが 1 以下の時は星を表示しない(= 1つ目のハンバーガーは星演出なし)
    setStars(numOfBurgers > 1 ? (winStreak > 3 ? manyStars : fewStars) : []);

    const resetStars = (timestamp: number) => {
      if (timestamp - start > 100) {
        setStars([]);
      } else {
        req = requestAnimationFrame(resetStars);
      }
    };
    resetStars(start);
    return () => cancelAnimationFrame(req);

    // numOfBurgers の変化にだけ依存
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
                src={StarImg}
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
});

export default GameStars;
