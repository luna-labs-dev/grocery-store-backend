import { mockRepositories } from 'tests/mocks/repositories';

import {
  DbEndShoppingEvent,
  GetShoppingEventByIdRepository,
  UpdateShoppingEventRepository,
} from '@/application';
import { EndShoppingEvent, EndShoppingEventParams } from '@/domain';

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

interface MockEndShoppingEventData {
  params: EndShoppingEventParams;
}

export const mockEndShoppingEventData = (): MockEndShoppingEventData => {
  const shoppingEventId = '09cde9b9-b54e-4c8a-b87b-f9efec57c893';
  const params: EndShoppingEventParams = {
    shoppingEventId,
  };

  return { params };
};
