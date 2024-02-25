import { mockRepositories } from 'tests/mocks/repositories';

import {
  AddShoppingEventRepository,
  DbStartShoppingEvent,
  GetMarketByIdRepository,
} from '@/application';
import { StartShoppingEvent, StartShoppingEventParams } from '@/domain';

interface SutResult {
  sut: StartShoppingEvent;
  mockedMarketRepository: GetMarketByIdRepository;
  mockedShoppingEventRepository: AddShoppingEventRepository;
}

export const makeSut = (): SutResult => {
  const { mockedMarketRepository, mockedShoppingEventRepository } = mockRepositories();

  const sut = new DbStartShoppingEvent();

  return {
    sut,
    mockedMarketRepository,
    mockedShoppingEventRepository,
  };
};

interface MockedStartShoppingEventDataType {
  marketId: string;
  params: StartShoppingEventParams;
}

export const MockedStartShoppingEventData = (): MockedStartShoppingEventDataType => {
  const marketId = '69919c3e-fa2f-414d-be9e-6c6c85083b63';

  const params: StartShoppingEventParams = {
    marketId,
  };

  return {
    marketId,
    params,
  };
};
