import styled from 'styled-components';

export const Wrapper = styled.div<{ expanded: boolean; isScroll: boolean }>`
  background-color: rgb(40, 42, 54, 0.9);
  bottom: 0;
  position: fixed;
  top: 0;
  z-index: 99;
  transition: all 0.4s ease-in-out;

  left: ${({ expanded }) => (expanded ? 0 : 224)}px; // 224 or 210
  width: ${({ expanded }) => (expanded ? '100%' : '0')};
  height: ${({ expanded }) => (expanded ? '100%' : '0')};
  margin-top: ${({ isScroll }) => (isScroll ? 50 : 80)}px;
  border-radius: ${({ isScroll, expanded }) => (isScroll && expanded ? 0 : 10)}px;

  @media (max-width: 768px) {
    margin-top: ${({ isScroll }) => (isScroll ? 50 : 60)}px;
  }
`;

export const ItemsWrapper = styled.div<{ expanded: boolean }>`
  padding-top: 10px;
  overflow: auto;
  transition: all 0.5s ease;

  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  position: absolute;
  width: 100%;
  z-index: 999;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const IWrapper = styled.div<{ isScroll: boolean }>`
  width: 100%;
  padding: 8px 20px;
  display: block;
  border-bottom: 1px solid ${({ theme, isScroll }) => (isScroll ? theme.colors.blue350 : theme.colors.red250)};
`;
