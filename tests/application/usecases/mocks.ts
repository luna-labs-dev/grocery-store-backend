import { mockRepositories } from 'tests/mocks/repositories';

import { DbNewMarket, NewMarketRepositories } from '@/application';
import { NewMarket, NewMarketParams } from '@/domain';

interface SutResult {
  sut: NewMarket;
  marketRepository: NewMarketRepositories;
}

export const makeSut = (): SutResult => {
  const { marketRepository } = mockRepositories();
  const sut = new DbNewMarket(marketRepository);

  return { sut, marketRepository };
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
