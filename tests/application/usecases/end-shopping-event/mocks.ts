import { mockRepositories } from 'tests/mocks/repositories';

import {
  DbEndShoppingEvent,
  GetShoppingEventByIdRepository,
  UpdateShoppingEventRepository,
} from '@/application';
import { EndShoppingEvent } from '@/domain';

interface SutResult {
  sut: EndShoppingEvent;
  mockedShoppingEventRepository: GetShoppingEventByIdRepository & UpdateShoppingEventRepository;
}

export const makeSut = (): SutResult => {
  const { mockedShoppingEventRepository } = mockRepositories();

  const sut = new DbEndShoppingEvent(mockedShoppingEventRepository);

  return {
    sut,
    mockedShoppingEventRepository,
  };
};
