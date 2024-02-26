import { mockMarket } from './market';

import {
  CountMarketListRepositoryParams,
  GetMarketByCodeRepositoryParams,
  GetMarketByIdRepositoryParams,
  GetMarketListRepositoryParams,
  MarketRepositories,
  ShoppingEventRepositories,
} from '@/application';
import { Market, ShoppingEvent } from '@/domain';

export interface MockRepositoriesResult {
  mockedMarketRepository: MarketRepositories;
  mockedShoppingEventRepository: ShoppingEventRepositories;
}

class MockedMarketRepository implements MarketRepositories {
  count = (params: CountMarketListRepositoryParams): Promise<number> => {
    return Promise.resolve(1);
  };

  getAll = (params: GetMarketListRepositoryParams): Promise<Market[]> => {
    const { market } = mockMarket();

    return Promise.resolve([market]);
  };

  getById = (params: GetMarketByIdRepositoryParams): Promise<Market | undefined> => {
    const { market } = mockMarket(params.id);

    return Promise.resolve(market);
  };

  getByCode = (params: GetMarketByCodeRepositoryParams): Promise<Market | undefined> => {
    return Promise.resolve(undefined);
  };

  new = (market: Market): Promise<void> => {
    return Promise.resolve();
  };

  update = (market: Market): Promise<void> => {
    return Promise.resolve();
  };
}

class MockedShoppingEventRepository implements ShoppingEventRepositories {
  add = (shoppingEvent: ShoppingEvent): Promise<void> => {
    return Promise.resolve();
  };

  update = (shoppingEvent: ShoppingEvent): Promise<void> => {
    return Promise.resolve();
  };
}

export const mockRepositories = (): MockRepositoriesResult => {
  return {
    mockedMarketRepository: new MockedMarketRepository(),
    mockedShoppingEventRepository: new MockedShoppingEventRepository(),
  };
};
