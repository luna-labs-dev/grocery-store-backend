import { mockRepositories } from 'tests/mocks/repositories';

import { DbUpdateMarket, UpdateMarketRepositories } from '@/application';
import { UpdateMarket } from '@/domain';

interface SutResult {
  sut: UpdateMarket;
  mockedMarketRepository: UpdateMarketRepositories;
}

export const makeSut = (): SutResult => {
  const { mockedMarketRepository } = mockRepositories();

  const sut = new DbUpdateMarket(mockedMarketRepository);

  return { sut, mockedMarketRepository };
};
