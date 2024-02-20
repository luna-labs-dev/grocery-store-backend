import { mockRepositories } from 'tests/mocks/repositories';

import { NewMarketController } from '@/api';
import { DbNewMarket, MarketRepositories } from '@/application';
import { NewMarket } from '@/domain';

export interface sutResult {
  sut: NewMarketController;
  mockedNewMarket: NewMarket;
  mockedMarketRepository: MarketRepositories;
}

export const makeSut = (): sutResult => {
  const { mockedMarketRepository } = mockRepositories();
  const mockedNewMarket = new DbNewMarket(mockedMarketRepository);
  return {
    sut: new NewMarketController(mockedNewMarket),
    mockedNewMarket,
    mockedMarketRepository,
  };
};
