import React from 'react';
// libs
import ReactPaginate from 'react-paginate';
// icons
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
// views
import { Wrapper } from './views';

interface Props {
  page?: number;
  pageCount: number;
  onPageChange: (selected: number) => void;
}

const Pagination: React.FC<Props> = ({ pageCount, onPageChange, page }) => {
  if (pageCount <= 1) {
    return null;
  }

  const onChangePage = (selectedItem: { selected: number }) => onPageChange(selectedItem.selected);

  return (
    <Wrapper>
      <ReactPaginate
        forcePage={page}
        breakLabel={'...'}
        pageCount={pageCount}
        pageRangeDisplayed={1}
        marginPagesDisplayed={2}
        activeClassName={'active'}
        onPageChange={onChangePage}
        nextLabel={<AiOutlineArrowRight />}
        containerClassName={'pagination'}
        previousLabel={<AiOutlineArrowLeft />}
      />
    </Wrapper>
  );
};

export default Pagination;
