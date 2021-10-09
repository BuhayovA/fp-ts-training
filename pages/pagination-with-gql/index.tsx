import React from 'react';
import PaginationWithGQLPage from '@md-modules/pagination-with-gql';
import { MainLayout } from '@md-shared/layouts/main';

const PaginationWithGQL = () => {
  return (
    <MainLayout>
      <PaginationWithGQLPage />
    </MainLayout>
  );
};

export default PaginationWithGQL;
