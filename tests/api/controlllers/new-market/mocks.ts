import { mockRepositories } from 'tests/mocks/repositories';

import { AddMarketController } from '@/api';
import { DbAddMarket, MarketRepositories } from '@/application';
import { AddMarket } from '@/domain';

export interface sutResult {
  sut: AddMarketController;
  mockedNewMarket: AddMarket;
  mockedMarketRepository: MarketRepositories;
}

export const makeSut = (): sutResult => {
  const { mockedMarketRepository } = mockRepositories();
  const mockedNewMarket = new DbAddMarket(mockedMarketRepository);
  return {
    sut: new AddMarketController(mockedNewMarket),
    mockedNewMarket,
    mockedMarketRepository,
  };
};
