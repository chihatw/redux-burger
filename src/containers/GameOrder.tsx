import React from 'react';
import { config, Transition } from 'react-spring';

import { useAppSelector } from '../app/hooks';
import * as Order from '../components/Order';
import { imgs } from '../constants';
import { selectAllOrders } from '../features/orders/ordersSlice';

const GameOrder = React.memo(() => {
  const orders = useAppSelector(selectAllOrders);
  return (
    <div style={{ position: 'relative' }}>
      <Order.Container>
        <Transition
          items={orders}
          keys={(order: { name: string }) => order.name}
          config={config.wobbly}
          trail={100}
          from={{ height: 44, opacity: 1, scale: 1, x: '-110%' }}
          enter={{ height: 44, opacity: 1, scale: 1, x: '0%' }}
          leave={{ height: 0, opacity: 0, scale: 0, x: '0%' }}
        >
          {(
            {
              opacity,
              scale,
              x,
              height,
            }: { opacity: number; scale: number; x: string; height: number },
            item
          ) =>
            item && (
              <Order.Item
                x={x}
                scale={scale}
                count={item.count}
                opacity={opacity}
                height={height}
              >
                <div style={{ width: 30, marginRight: 8 }}>
                  <img
                    src={imgs[item.name]}
                    alt={item.name}
                    style={{ width: '100%' }}
                  />
                </div>
                <div>{item.name}</div>
                <div style={{ marginLeft: 'auto' }}>
                  x <strong>{item.count > 0 ? item.count : 0}</strong>
                </div>
              </Order.Item>
            )
          }
        </Transition>
      </Order.Container>
    </div>
  );
});

export default GameOrder;
