import styled from 'styled-components';
import { colors } from '@md-styles/styled/theme';

export const Wrapper = styled.div`
  margin: 0 auto;

  .pagination {
    display: flex;
    justify-content: center;
    margin: 0 auto;
    padding: 12px 0;
  }

  .pagination > li {
    padding: 5px;
  }

  .pagination > li {
    list-style: none;
  }

  .pagination > li > a,
  .pagination > li > span {
    height: 32px;
    width: 32px;
    cursor: pointer;
    border-radius: 50% 0 50% 0;
    color: ${colors.gray400};
    background-color: ${colors.white};

    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  .pagination > li.next > a {
    border-radius: 0 50% 50% 0;
  }

  .pagination > li.previous > a {
    border-radius: 50% 0 0 50%;
  }

  .pagination > li.active > a,
  .pagination > li.active > a:hover {
    color: ${colors.white};
    background-color: ${colors.red250};
  }

  .pagination > li > a:hover {
    opacity: 0.7;
  }
`;
