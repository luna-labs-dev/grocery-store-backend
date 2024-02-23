import { mockRepositories } from 'tests/mocks/repositories';

import { GetMarketListController } from '@/api';
import { DbGetMarketList, MarketRepositories } from '@/application';
import { GetMarketList, GetMarketListParams } from '@/domain';

export interface sutResult {
  sut: GetMarketListController;
  mockedGetMarketList: GetMarketList;
  mockedMarketRepository: MarketRepositories;
}

export const makeSut = (): sutResult => {
  const { mockedMarketRepository } = mockRepositories();

  const mockedGetMarketList = new DbGetMarketList(mockedMarketRepository);

  return {
    sut: new GetMarketListController(mockedGetMarketList),
    mockedGetMarketList,
    mockedMarketRepository,
  };
};

export interface MockedGetMarketListControllerObjects {
  params: GetMarketListParams;
}

export const mockedGetMarketListControllerObjects = (): MockedGetMarketListControllerObjects => {
  return {
    params: {
      pageIndex: 0,
      pageSize: 20,
      orderBy: 'createdAt',
      orderDirection: 'asc',
    },
  };
};
