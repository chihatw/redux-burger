import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useTransition, config } from 'react-spring';

import Order from '../components/Order';

const GameOrder = () => {
  const orders = useSelector((state) => state.gameStatus.orders, shallowEqual);

  const ordersTransition = useTransition(orders, (item) => item.name, {
    config: config.wobbly,
    trail: 100,
    from: { height: 44, opacity: 1, transform: 'scale(1) translateX(-110%)' },
    enter: { transform: 'scale(1) translateX(0%)' },
    leave: {
      height: 0,
      opacity: 0,
      transform: 'scale(0) translateX(0%)',
    },
  });

  return (
    <Order.Container>
      {ordersTransition.map(({ item, props, key }) => (
        <Order.Item key={key} style={props} count={item.count}>
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
      ))}
    </Order.Container>
  );
};

export default GameOrder;
