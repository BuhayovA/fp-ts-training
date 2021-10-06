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

  padding: ${({ isScroll }) => (isScroll ? '15px 0px' : '30px 0px')};
  background-color: ${({ isScroll }) => isScroll && 'rgb(40, 42, 54, 0.9)'};
  box-shadow: ${({ isScroll }) => isScroll && 'rgba(0, 0, 0, 0.35) 0px 5px 15px'};

  @media (max-width: 768px) {
    padding: ${({ isScroll }) => (isScroll ? '15px 20px' : '20px 20px')};
  }
`;

export const ScreenTitle = styled.p<{ isScroll: boolean }>`
  margin: 0;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;

  color: ${({ theme, isScroll }) => (isScroll ? theme.colors.white : theme.colors.gray400)};

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export const Logo = styled.img`
  margin: 0 20px 0 40px;
  cursor: pointer;
  width: 20px;
  height: 20px;

  @media (max-width: 768px) {
    margin: 0 20px 0 0;
  }
`;
