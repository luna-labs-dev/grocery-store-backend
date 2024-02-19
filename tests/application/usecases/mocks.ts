import { DbNewMarket, GetMarketByCodeRepositoryParams, NewMarketRepositories } from '@/application';
import { Market, NewMarket } from '@/domain';

const mockRepository = (): NewMarketRepositories => {
  class MockedNewMarketRepository implements NewMarketRepositories {
    getByCode = (params: GetMarketByCodeRepositoryParams): Promise<Market | undefined> => {
      return Promise.resolve(undefined);
    };

    create = (market: Market): Promise<void> => {
      return Promise.resolve();
    };
  }

  return new MockedNewMarketRepository();
};

interface SutResult {
  sut: NewMarket;
  repository: NewMarketRepositories;
}

export const makeSut = (): SutResult => {
  const repository = mockRepository();
  const sut = new DbNewMarket(repository);

  return { sut, repository };
};
