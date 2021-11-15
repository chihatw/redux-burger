import Cheese from './img/Cheese.png';
import Lettuce from './img/Lettuce.png';
import Patty from './img/Patty.png';
import Pickles from './img/Pickles.png';
import Tomato from './img/Tomato.png';
import Bacon from './img/Bacon.png';

export const IngredientsArray = [
  'Cheese',
  'Pickles',
  'Lettuce',
  'Tomato',
  'Patty',
  'Bacon',
];

const size = {
  mobileS: '320px',
  mobileM: '375px',
  mobileL: '400px',
  tablet: '768px',
  laptop: '1024px',
  laptopL: '1440px',
  desktop: '2560px',
};

export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};

export const imgs: { [key: string]: string } = {
  Bacon: Bacon,
  Patty: Patty,
  Cheese: Cheese,
  Lettuce: Lettuce,
  Pickles: Pickles,
  Tomato: Tomato,
};
