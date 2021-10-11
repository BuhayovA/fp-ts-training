import * as React from 'react';
// views
import { InnerWrapper, Wrapper } from './views';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;

  disabled?: boolean;
  grayBG?: boolean;
}

const Button: React.FC<ButtonProps> = ({ disabled = false, children, isLoading = false, grayBG, ...rest }) => (
  <Wrapper grayBG={grayBG} disabled={disabled || isLoading} isLoading={isLoading} {...rest}>
    <InnerWrapper>{isLoading ? <div>Loading...</div> : children}</InnerWrapper>
  </Wrapper>
);

export { Button };
