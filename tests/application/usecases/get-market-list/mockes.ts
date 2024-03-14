import { mockRepositories } from 'tests/mocks/repositories';

import { DbGetMarketList, GetMarketListRepository } from '@/application';
import { GetMarketList, GetMarketListParams } from '@/domain';

interface SutResult {
  sut: GetMarketList;
  mockedMarketRepository: GetMarketListRepository;
}

export const MakeSut = (): SutResult => {
  const { mockedMarketRepository } = mockRepositories();

  const sut = new DbGetMarketList(mockedMarketRepository);

  return {
    sut,
    mockedMarketRepository,
  };
};

interface MockGetMarketListResult {
  search: string;
  paginatedParams: GetMarketListParams;
}

export const mockGetMarketList = (): MockGetMarketListResult => {
  const search = 'Assai';

  const paginatedParams: GetMarketListParams = {
    pageIndex: 0,
    pageSize: 20,
    orderBy: 'createdAt',
    orderDirection: 'asc',
    search,
  };

  return { search, paginatedParams };
};
