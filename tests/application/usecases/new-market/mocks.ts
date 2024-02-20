import { mockRepositories } from 'tests/mocks/repositories';

import { DbNewMarket, NewMarketRepositories } from '@/application';
import { NewMarket, NewMarketParams } from '@/domain';

interface SutResult {
  sut: NewMarket;
  mockedMarketRepository: NewMarketRepositories;
}

export const makeSut = (): SutResult => {
  const { mockedMarketRepository } = mockRepositories();
  const sut = new DbNewMarket(mockedMarketRepository);

  return { sut, mockedMarketRepository };
};

interface MockParams {
  newMarketParams: NewMarketParams;
}

export const mockParams = (): MockParams => {
  return {
    newMarketParams: {
      name: 'Assai Carapicuiba',
      user: 'tiagoluizpoli@gmail.com',
    },
  };
};
