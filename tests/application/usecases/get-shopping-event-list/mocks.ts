import { mockRepositories } from 'tests/mocks/repositories';

import {
  DbGetShoppingEventList,
  GetShoppingEventByIdRepository,
  UpdateShoppingEventRepository,
} from '@/application';
import { GetShoppingEventList, GetShoppingEventListParams } from '@/domain';

interface SutResult {
  sut: GetShoppingEventList;
  mockedShoppingEventRepository: GetShoppingEventByIdRepository & UpdateShoppingEventRepository;
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
}

export const mockEndShoppingEventData = (): MockEndShoppingEventData => {
  const params: GetShoppingEventListParams = {
    pageIndex: 0,
    pageSize: 20,
    orderBy: 'createdAt',
    orderDirection: 'asc',
  };

  return { params };
};
