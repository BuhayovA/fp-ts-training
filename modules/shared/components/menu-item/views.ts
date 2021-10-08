import styled from 'styled-components';

export const MenuI = styled.div<{ active: boolean; color?: string }>`
  position: relative;
  margin: 0px 20px;
  transition: 1s;
  font-size: 14px;
  font-weight: 500;

  a {
    display: flex;
    text-decoration: none;
    transition: opacity 0.3s ease-in-out;

    color: ${({ theme, color }) => color || theme.colors.white};

    opacity: ${({ active }) => active && 0.7};

    &:hover {
      opacity: 0.5;
    }

    svg {
      margin-right: 28px;
    }

    span {
      color: black;
      display: unset;
      text-decoration: none;
    }
  }
`;
