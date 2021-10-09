import React from 'react';
// libs
import styled from 'styled-components';

// types
interface Props {
  name: string;
}

// styles
export const Wrapper = styled.div`
  width: 100%;
  padding: 30px 10px;
  margin: 5px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;

  background: ${({ theme }) => theme.colors.white};
`;

const Card: React.FC<Props> = ({ name }) => {
  return <Wrapper>{name}</Wrapper>;
};

export default Card;
