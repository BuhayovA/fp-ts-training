import styled from 'styled-components';

export const Wrapper = styled.div<{ isScroll: boolean }>`
  left: 0;
  position: fixed;
  top: 0;
  transition: all 0.4s ease 0s;
  width: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: ${({ isScroll }) => (isScroll ? '15px 20px' : '30px 20px')};
  background-color: ${({ isScroll }) => isScroll && 'rgb(40, 42, 54, 0.96)'};
  box-shadow: ${({ isScroll }) => isScroll && 'rgba(0, 0, 0, 0.35) 0px 5px 15px'};

  @media (max-width: 768px) {
    padding: ${({ isScroll }) => (isScroll ? '15px 20px' : '20px 20px')};
  }
`;

export const LeftSide = styled.div`
  display: flex;
  align-items: center;
`;

export const ScreenTitle = styled.p<{ isScroll: boolean }>`
  margin: 0;
  cursor: pointer;
  font-weight: 500;

  color: ${({ theme, isScroll }) => (isScroll ? theme.colors.white : theme.colors.gray400)};

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Logo = styled.img`
  margin: 0 20px 0 20px;
  cursor: pointer;
  width: 20px;
  height: 20px;

  @media (max-width: 768px) {
    margin: 0 20px 0 0;
  }
`;

export const BurgerWrapper = styled.div<{ isActive: boolean; isScroll: boolean }>`
  width: 30px;
  height: 20px;
  cursor: pointer;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  transform: rotate(0deg);
  transition: 0.5s ease-in-out;
  justify-content: space-between;

  div {
    height: 2px;
    width: 100%;
    padding: 0;
    margin: 0;
    border-radius: 9px;
    transition: 0.25s ease-in-out;

    background: ${({ theme, isScroll }) => (isScroll ? theme.colors.white : theme.colors.gray400)};
  }
`;

export const Line1 = styled.div<{ isActive: boolean }>`
  top: ${({ isActive }) => (isActive ? '8px' : '0px')};
  transform: ${({ isActive }) => isActive && 'rotate(135deg)'};
  position: ${({ isActive }) => isActive && 'absolute'};
`;

export const Line2 = styled.div<{ isActive: boolean }>`
  opacity: ${({ isActive }) => isActive && '0'};
  position: ${({ isActive }) => isActive && 'absolute'};
`;

export const Line3 = styled.div<{ isActive: boolean }>`
  position: ${({ isActive }) => isActive && 'absolute'};

  top: ${({ isActive }) => isActive && '8px'};
  transform: ${({ isActive }) => (isActive ? 'rotate(-135deg)' : ' rotate(0deg)')};
`;
