import styled, { css } from 'styled-components';
// local
import { ButtonPresets, buttonPresets } from './presets';

export const Wrapper = styled.button<{
  grayBG?: boolean;
  disabled: boolean;
  isLoading: boolean;
  preset?: ButtonPresets;
}>`
  display: inline-flex;
  align-items: center;
  box-shadow: 0 3px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  height: 45px;
  cursor: pointer;
  padding: 0 30px;

  border: none;
  transition: background 0.3s, transform 0.3s, box-shadow 0.3s;

  color: ${({ theme }) => theme.colors.white};

  &:hover {
    background: darken(#c06c84, 10%);
    box-shadow: 0 4px 17px rgba(0, 0, 0, 0.2);
    transform: translate3d(0, -2px, 0);
  }

  &:active {
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.1);
    transform: translate3d(0, 1px, 0);
  }

  ${({ theme }) => theme.templates.centerContent};
  ${({ preset }) => preset && buttonPresets[preset]};

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
