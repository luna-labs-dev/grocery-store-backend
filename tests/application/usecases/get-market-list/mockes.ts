import { mockRepositories } from 'tests/mocks/repositories';

import { DbGetMarketList, GetMarketListRepository } from '@/application';
import { GetMarketList } from '@/domain';

interface SutResult {
  sut: GetMarketList;
  mockedMarketRepository: GetMarketListRepository;
}

export const MakeSut = (): SutResult => {
  const { mockedMarketRepository } = mockRepositories();

  const sut = new DbGetMarketList(mockedMarketRepository);

  return {
    sut,
    mockedMarketRepository,
  };
};
