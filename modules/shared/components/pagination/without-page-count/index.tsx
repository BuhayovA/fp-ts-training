import React from 'react';
// views
import { Wrapper, Label, LeftArrow, RightArrow } from '@md-shared/components/pagination/without-page-count/views';

export type Direction = 'NEXT' | 'PREV';

// types
interface Props {
  page?: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (direction: Direction) => void;
}

// constants
const ARROW_SIZE = 20;

const PaginationWithHasMore: React.FC<Props> = ({ hasNext, hasPrev, onPageChange, page }) => {
  return (
    <Wrapper>
      <LeftArrow size={ARROW_SIZE} isActive={hasPrev} onClick={() => hasPrev && onPageChange('PREV')} />
      <Label>Page {page}</Label>
      <RightArrow size={ARROW_SIZE} isActive={hasNext} onClick={() => hasNext && onPageChange('NEXT')} />
    </Wrapper>
  );
};

export default PaginationWithHasMore;
