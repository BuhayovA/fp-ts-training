import { css } from 'styled-components';

export const buttonPresets = {
  default: css`
    background-color: ${({ theme }) => theme.colors.blue350};
  `,
  cancel: css`
    background-color: ${({ theme }) => theme.colors.red250};
  `
};

export type ButtonPresets = keyof typeof buttonPresets;
