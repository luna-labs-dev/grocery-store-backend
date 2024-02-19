import { GetMarketByCodeRepositoryParams, MarketRepositories } from '@/application';
import { Market } from '@/domain';

export interface MockRepositoriesResult {
  marketRepository: MarketRepositories;
}

export const mockRepositories = (): MockRepositoriesResult => {
  class MockedMarketRepository implements MarketRepositories {
    getByCode = (params: GetMarketByCodeRepositoryParams): Promise<Market | undefined> => {
      return Promise.resolve(undefined);
    };

    new = (market: Market): Promise<void> => {
      return Promise.resolve();
    };
  }

  return {
    marketRepository: new MockedMarketRepository(),
  };
};
