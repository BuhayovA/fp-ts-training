import styled, { css } from 'styled-components';

export const Wrapper = styled.button<{
  isLoading: boolean;
  disabled: boolean;
  grayBG?: boolean;
}>`
  border-radius: 10px;
  border: none;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  max-width: 188px;
  min-width: 112px;
  outline: none;
  padding: 14px 16px;
  position: relative;
  transition: opacity 0.2s linear;
  background-color: ${({ theme }) => theme.colors.red250};

  &:hover {
    opacity: 0.9;
  }

  &:active {
    opacity: 0.9;
  }

  ${({ theme }) => theme.templates.centerContent};

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: ${({ theme }) => theme.colors.gray150};
    `}

  ${({ isLoading }) =>
    isLoading &&
    css`
      background-color: ${({ theme }) => theme.colors.gray150};
    `}
`;

export const InnerWrapper = styled.div`
  align-content: center;
  display: flex;
  flex-direction: row;
  position: relative;
`;
