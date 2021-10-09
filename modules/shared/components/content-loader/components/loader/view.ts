import styled from 'styled-components';

export const LoaderWrapper = styled.div`
  animation: rotate 1s infinite;
  height: 50px;
  width: 50px;

  &:before,
  :after {
    border-radius: 50%;
    content: '';
    display: block;
    height: 20px;
    width: 20px;
  }

  &:before {
    animation: ball1 1s infinite;
    box-shadow: 30px 0 0 ${({ theme }) => theme.colors.blue350};
    margin-bottom: 10px;
    background: url(/static/images/knowledge-black.png) center top / cover no-repeat;
  }

  &:after {
    animation: ball2 1s infinite;
    box-shadow: 30px 0 0 ${({ theme }) => theme.colors.red250};
    background: url(/static/images/knowledge-white.png) center top / cover no-repeat;
  }

  @keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg) scale(0.8);
      -moz-transform: rotate(0deg) scale(0.8);
    }
    50% {
      -webkit-transform: rotate(360deg) scale(1.2);
      -moz-transform: rotate(360deg) scale(1.2);
    }
    100% {
      -webkit-transform: rotate(720deg) scale(0.8);
      -moz-transform: rotate(720deg) scale(0.8);
    }
  }

  @keyframes ball1 {
    0% {
      box-shadow: 30px 0 0 ${({ theme }) => theme.colors.blue350};
    }
    50% {
      box-shadow: 0 0 0 ${({ theme }) => theme.colors.blue350};
      margin-bottom: 0;
      -webkit-transform: translate(15px, 15px);
      -moz-transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 ${({ theme }) => theme.colors.blue350};
      margin-bottom: 10px;
    }
  }

  @keyframes ball2 {
    0% {
      box-shadow: 30px 0 0 ${({ theme }) => theme.colors.red250};
    }
    50% {
      box-shadow: 0 0 0 ${({ theme }) => theme.colors.red250};
      margin-top: -20px;
      -webkit-transform: translate(15px, 15px);
      -moz-transform: translate(15px, 15px);
    }
    100% {
      box-shadow: 30px 0 0 ${({ theme }) => theme.colors.red250};
      margin-top: 0;
    }
  }
`;
