const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // 0 から i のランダムなインデックス
    [array[i], array[j]] = [array[j], array[i]]; // 要素を入れ替えます
  }
  return array;
};

const helpers = {
  randomNumber: (min, max) => {
    return Math.floor(Math.random() * max + min);
  },

  randomizeOrder: (num, arr) => {
    const currentOrders = [];
    const shuffledIngredients = shuffle(arr);
    const orders = shuffledIngredients.slice(0, num);

    for (let i = 0; i < orders.length; i++) {
      let newOrder = {
        name: shuffledIngredients[i],
        count: helpers.randomNumber(1, 2),
      };
      currentOrders.push(newOrder);
    }
    return currentOrders;
  },

  setNumberOfOrders: (time) => {
    if (time >= 40) {
      return 2;
    } else if (time >= 20 && time < 40) {
      return 3;
    } else return 4;
  },
};

export default helpers;
