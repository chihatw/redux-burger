import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { animated } from 'react-spring';

import BottomBun from './../img/BottomBun.png';
import TopBun from './../img/TopBun.png';
import Plate from './../img/Plate.png';

import { device } from '../constants';

const BurgerContainer = styled(animated.div)`
  position: absolute;
  bottom: 140px;
  width: 310px;
  left: 50%;
  transform: translateX(-50%);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;

  -webkit-tap-highlight-color: transparent;

  @media ${device.tablet} {
    bottom: 80px;
  }
`;

export const IngredientsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  width: 350px;
`;

export const Ingredient = styled(animated.li)`
  position: relative;
  z-index: 1;
  height: 30px;
  will-change: transform, opacity, height;

  img {
    position: relative;
    top: 20px;
    display: block;
    margin: 0 auto;
  }

  &.ing-cheese {
    height: 5px;
    img {
      width: 230px;
    }

    @media ${device.mobileM} {
      height: 10px;
      img {
        width: 310px;
      }
    }
  }

  &.ing-pickles {
    height: 5px;
    img {
      top: 40px;
      width: 130px;
    }

    @media ${device.mobileM} {
      height: 15px;
      img {
        width: 215px;
      }
    }
  }

  &.ing-lettuce {
    height: 5px;
    img {
      width: 230px;
    }

    @media ${device.mobileM} {
      height: 16px;
      img {
        width: 340px;
      }
    }
  }

  &.ing-patty,
  &.ing-bacon {
    height: 5px;
    img {
      top: 10px;
      width: 210px;
    }
    @media ${device.mobileM} {
      height: 25px;
      img {
        width: 280px;
      }
    }
  }

  &.ing-tomato {
    height: 5px;
    img {
      width: 185px;
      top: 10px;
    }

    @media ${device.mobileM} {
      height: 20px;
      img {
        width: 270px;
      }
    }
  }
`;

const TopBunContainer = styled(animated.div)`
  position: relative;
  z-index: 100;
  width: 210px;
  top: 75px;
  will-change: transform;

  transform: rotate(0deg) translateY(0px);
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &.animate {
    transform: rotate(-20deg) translateY(-150px);
  }

  @media ${device.mobileM} {
    width: 300px;
    top: 105px;
  }

  img {
    width: 100%;
  }
`;

const BottomBunContainer = styled(TopBunContainer)`
  top: 0;
  z-index: 2;

  transform: scale(1) translateY(0px);
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &.animate {
    transform: scale(1.1) translateY(-10px);
  }

  @media ${device.mobileM} {
    top: 0px;
  }
`;

const PlateContainer = styled(animated.div)`
  position: absolute;
  width: 360px;
  bottom: -64px;
  z-index: 1;

  img {
    width: 100%;
  }

  @media ${device.mobileM} {
    width: 470px;
    bottom: -80px;
  }
`;

export const SliderContainer = styled(animated.div)`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  will-change: transform;
  z-index: 10;
`;

const IngredientsContainer = styled.div`
  transform: scale(1) translateY(0px);
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  z-index: 3;
  will-change: transform;
  &.animate {
    transform: scale(1.1) translateY(-10px);
  }
`;

export const Container = React.forwardRef<
  HTMLDivElement,
  { children: ReactElement; dragStatus: { canDrop: boolean } }
>(({ children, dragStatus }, ref) => {
  const isDroppable = dragStatus.canDrop;

  return (
    <BurgerContainer ref={ref}>
      <TopBunContainer className={`${isDroppable ? ' animate' : ''}`}>
        <img src={TopBun} alt='Top Bun' />
      </TopBunContainer>
      <IngredientsContainer className={`${isDroppable ? 'animate' : ''}`}>
        {children}
      </IngredientsContainer>

      <BottomBunContainer className={`${isDroppable ? ' animate' : ''}`}>
        <img src={BottomBun} alt='Bottom Bun' />
      </BottomBunContainer>
      <PlateContainer>
        <img src={Plate} alt='Plate' />
      </PlateContainer>
    </BurgerContainer>
  );
});
