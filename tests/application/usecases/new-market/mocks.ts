import { mockRepositories } from 'tests/mocks/repositories';

import { AddMarketRepositories, DbAddMarket } from '@/application';
import { AddMarket, AddMarketParams } from '@/domain';

interface SutResult {
  sut: AddMarket;
  mockedMarketRepository: AddMarketRepositories;
}

export const makeSut = (): SutResult => {
  const { mockedMarketRepository } = mockRepositories();
  const sut = new DbAddMarket(mockedMarketRepository);

  return { sut, mockedMarketRepository };
};

interface MockParams {
  newMarketParams: AddMarketParams;
}

export const mockParams = (): MockParams => {
  return {
    newMarketParams: {
      marketName: 'Assai Carapicuiba',
      user: 'tiagoluizpoli@gmail.com',
    },
  };
};
