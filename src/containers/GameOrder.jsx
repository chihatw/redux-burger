import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useTransition, config } from 'react-spring';

import Order from '../components/Order';

const GameOrder = () => {
  const orders = useSelector((state) => state.gameStatus.orders, shallowEqual);

  const ordersTransition = useTransition(orders, {
    config: config.wobbly,
    trail: 100,
    keys: (order) => order.name,
    from: { height: 44, opacity: 1, scale: 1, x: '-110%' },
    enter: { height: 44, opacity: 1, scale: 1, x: '0%' },
    leave: { height: 0, opacity: 0, scale: 0, x: '0%' },
  });

  return (
    <Order.Container>
      {ordersTransition(
        (styles, item) =>
          item && (
            <Order.Item style={styles} count={item.count}>
              <div style={{ width: 30, marginRight: 8 }}>
                <img
                  src={require(`./../img/${item.name}.png`)}
                  alt={item.name}
                  style={{ width: '100%' }}
                />
              </div>
              <div>{item.name}</div>
              <div style={{ marginLeft: 'auto' }}>
                x <strong>{item.count !== 0 ? item.count : 1}</strong>
              </div>
            </Order.Item>
          )
      )}
    </Order.Container>
  );
};

export default GameOrder;
