import styled from 'styled-components';

export const ContentWrapper = styled.div`
  min-height: 100%;
  padding: 80px 40px 40px;
  transition: margin-left 0.5s ease;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-left: 0;
    padding: 60px 20px 20px;
  }
`;

export const Wrapper = styled.div<{ expanded: boolean }>`
  min-height: 100%;
`;

export const ScreenTitle = styled.p`
  font-size: 32px;

  font-weight: 500;

  color: ${({ theme }) => theme.colors.gray400};
`;
