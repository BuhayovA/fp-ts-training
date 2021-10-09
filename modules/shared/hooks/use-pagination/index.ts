export interface UsePaginationArgs {
  itemsPerPage: number;
  totalCount?: number;
}

interface PaginationVariables {
  pagination: { skip: number; take: number };
}

export type UsePagination = (args: UsePaginationArgs) => {
  pageCount: number;
  getPaginationVariables: (selected: number) => PaginationVariables;
};

const usePagination: UsePagination = ({ itemsPerPage, totalCount = 0 }) => {
  const pageCount = Math.ceil(totalCount / itemsPerPage);

  const getPaginationVariables = (selected: number): PaginationVariables => ({
    pagination: { skip: selected * itemsPerPage, take: itemsPerPage }
  });

  return { pageCount, getPaginationVariables };
};

export { usePagination };
