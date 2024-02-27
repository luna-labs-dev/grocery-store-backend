import { mockRepositories } from 'tests/mocks/repositories';

import { AddShoppingEventRepository, DbEndShoppingEvent } from '@/application';
import { EndShoppingEvent } from '@/domain';

interface SutResult {
  sut: EndShoppingEvent;
  mockedShoppingEventRepository: AddShoppingEventRepository;
}

export const makeSut = (): SutResult => {
  const { mockedShoppingEventRepository } = mockRepositories();

  const sut = new DbEndShoppingEvent();

  return {
    sut,
    mockedShoppingEventRepository,
  };
};
