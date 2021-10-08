import styled from 'styled-components';

export const MenuI = styled.div<{ active: boolean }>`
  position: relative;
  margin: 0px 25px;
  transition: 1s;
  font-size: 14px;
  font-weight: 500;

  color: ${({ theme }) => theme.colors.gray400};

  a {
    display: flex;
    text-decoration: none;
    transition: opacity 0.3s ease-in-out;

    color: ${({ theme, active }) => (active ? theme.colors.gray200 : theme.colors.white)};

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
