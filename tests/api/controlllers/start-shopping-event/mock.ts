import { mockRepositories } from 'tests/mocks/repositories';

import { StartShoppingEventController, StartShoppingEventControllerRequest } from '@/api';
import { DbStartShoppingEvent, MarketRepositories, ShoppingEventRepositories } from '@/application';
import { StartShoppingEvent } from '@/domain';

export interface SutResult {
  sut: StartShoppingEventController;
  mockedStartShoppingEvent: StartShoppingEvent;
  mockedMarketRepository: MarketRepositories;
  mockedShoppingEventRepository: ShoppingEventRepositories;
}

export const makeSut = (): SutResult => {
  const { mockedMarketRepository, mockedShoppingEventRepository } = mockRepositories();

  const mockedStartShoppingEvent = new DbStartShoppingEvent(
    mockedMarketRepository,
    mockedShoppingEventRepository,
  );

  const sut = new StartShoppingEventController(mockedStartShoppingEvent);

  return {
    sut,
    mockedStartShoppingEvent,
    mockedMarketRepository,
    mockedShoppingEventRepository,
  };
};

interface MockedStartShoppingEventControllerData {
  params: StartShoppingEventControllerRequest;
}

export const mockedStartShoppingEventControllerData =
  (): MockedStartShoppingEventControllerData => {
    const params: StartShoppingEventControllerRequest = {
      marketId: '0d2962f1-c89a-49dc-8edb-0252ba9baa65',
      user: 'some-user@email.com',
    };
    return {
      params,
    };
  };
