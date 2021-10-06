import styled from 'styled-components';

export const Wrapper = styled.div<{ expanded: boolean; isScroll: boolean }>`
  background-color: rgb(40, 42, 54, 0.9);
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 99;
  transition: all 0.5s ease;

  height: ${({ expanded }) => (expanded ? '100%' : '0')};
  margin-top: ${({ isScroll }) => (isScroll ? 50 : 80)}px;

  @media (max-width: 768px) {
    margin-top: ${({ isScroll }) => (isScroll ? 50 : 60)}px;
  }
`;

export const ItemsWrapper = styled.div<{ expanded: boolean }>`
  padding-top: 10px;
  overflow: auto;
  transition: all 0.5s ease;

  display: ${({ expanded }) => (expanded ? 'block' : 'none')};
`;

export const IWrapper = styled.div<{ isScroll: boolean }>`
  width: 100%;
  padding: 8px 15px;
  display: block;
  border-bottom: 1px solid ${({ theme, isScroll }) => (isScroll ? theme.colors.blue350 : theme.colors.red250)};
`;

export const Scroll = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  z-index: 999;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;
