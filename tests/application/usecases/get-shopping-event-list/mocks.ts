import { mockRepositories } from 'tests/mocks/repositories';
import { mockShoppingEvent } from 'tests/mocks/shopping-event';

import {
  CountShoppingEventListRepositoryParams,
  DbGetShoppingEventList,
  GetShoppingEventListRepository,
} from '@/application';
import {
  GetShoppingEventList,
  GetShoppingEventListParams,
  GetShoppingEventListResult,
} from '@/domain';

interface SutResult {
  sut: GetShoppingEventList;
  mockedShoppingEventRepository: GetShoppingEventListRepository;
}

export const makeSut = (): SutResult => {
  const { mockedShoppingEventRepository } = mockRepositories();

  const sut = new DbGetShoppingEventList(mockedShoppingEventRepository);

  return {
    sut,
    mockedShoppingEventRepository,
  };
};

interface MockEndShoppingEventData {
  params: GetShoppingEventListParams;
  repositoryParams: CountShoppingEventListRepositoryParams;
  successResponse: GetShoppingEventListResult;
  emptyResponse: GetShoppingEventListResult;
}

export const mockEndShoppingEventData = (): MockEndShoppingEventData => {
  const params: GetShoppingEventListParams = {
    pageIndex: 0,
    pageSize: 20,
    orderBy: 'createdAt',
    orderDirection: 'asc',
  };

  const repositoryParams: CountShoppingEventListRepositoryParams = {
    status: undefined,
    period: undefined,
  };

  const { shoppingEvent } = mockShoppingEvent();

  const shoppingEventList = [shoppingEvent];
  const successResponse: GetShoppingEventListResult = {
    total: shoppingEventList.length,
    shoppingEvents: shoppingEventList,
  };

  const emptyResponse: GetShoppingEventListResult = {
    total: 0,
    shoppingEvents: [],
  };

  return { params, repositoryParams, successResponse, emptyResponse };
};
