import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

export const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const LeftArrow = styled(AiOutlineArrowLeft)<{ isActive: boolean }>`
  cursor: pointer;
  opacity: ${({ isActive }) => !isActive && 0.4};
  transition: opacity 0.2s linear;

  &:hover {
    opacity: 0.4;
  }
`;

export const RightArrow = styled(AiOutlineArrowRight)<{ isActive: boolean }>`
  cursor: pointer;
  opacity: ${({ isActive }) => !isActive && 0.4};
  transition: opacity 0.2s linear;

  &:hover {
    opacity: 0.4;
  }
`;

export const Label = styled.p`
  font-size: 16px;
  margin: 0px 8px;

  ${({ theme }) => theme.colors.gray400}
`;
