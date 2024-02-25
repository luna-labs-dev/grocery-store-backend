import { mockRepositories } from 'tests/mocks/repositories';

import { StartShoppingEventController } from '@/api';
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

  const sut = new StartShoppingEventController();

  return {
    sut,
    mockedStartShoppingEvent,
    mockedMarketRepository,
    mockedShoppingEventRepository,
  };
};
