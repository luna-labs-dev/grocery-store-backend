import { mockMarket } from './market';

import {
  GetMarketByCodeRepositoryParams,
  GetMarketByIdRepositoryParams,
  GetMarketListRepositoryParams,
  MarketRepositories,
} from '@/application';
import { Market } from '@/domain';

export interface MockRepositoriesResult {
  mockedMarketRepository: MarketRepositories;
}

export const mockRepositories = (): MockRepositoriesResult => {
  class MockedMarketRepository implements MarketRepositories {
    getAll = (params: GetMarketListRepositoryParams): Promise<Market[]> => {
      const { market } = mockMarket();

      return Promise.resolve([market]);
    };

    getById = (params: GetMarketByIdRepositoryParams): Promise<Market | undefined> => {
      const { market } = mockMarket();

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

  return {
    mockedMarketRepository: new MockedMarketRepository(),
  };
};
