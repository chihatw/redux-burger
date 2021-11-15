import { Order } from './features/orders/ordersSlice';

const shuffle = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // 0 から i のランダムなインデックス
    [array[i], array[j]] = [array[j], array[i]]; // 要素を入れ替えます
  }
  return array;
};

const helpers = {
  randomNumber: (min: number, max: number) => {
    return Math.floor(Math.random() * max + min);
  },

  randomizeOrder: (num: number, arr: string[]) => {
    const currentOrders: Order[] = [];
    const shuffledIngredients = shuffle(arr);
    const orders = shuffledIngredients.slice(0, num);

    for (let i = 0; i < orders.length; i++) {
      const newOrder = {
        name: shuffledIngredients[i],
        count: helpers.randomNumber(1, 2),
      };
      currentOrders.push(newOrder);
    }
    return currentOrders;
  },

  setNumberOfOrders: (time: number) => {
    if (time >= 40) {
      return 2;
    } else if (time >= 20 && time < 40) {
      return 3;
    } else return 4;
  },
};

export const setTimeoutWithRequestAnimationFrame = (
  callback: () => void,
  duration: number
) => {
  const startTime = performance.now();
  const timer = (timestamp: number) => {
    const elapsedTime = Math.max(0, timestamp - startTime);
    if (elapsedTime > duration) {
      callback();
    } else {
      requestAnimationFrame(timer);
    }
  };
  timer(startTime);
};

export default helpers;
