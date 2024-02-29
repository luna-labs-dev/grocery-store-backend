import { mockRepositories } from 'tests/mocks/repositories';
import { mockShoppingEvent } from 'tests/mocks/shopping-event';

import { EndShoppingEventController, EndShoppingEventControllerRequest } from '@/api';
import { DbEndShoppingEvent, ShoppingEventRepositories } from '@/application';
import { EndShoppingEvent } from '@/domain';

export interface SutResult {
  sut: EndShoppingEventController;
  mockedEndShoppingEvent: EndShoppingEvent;
  mockedShoppingEventRepository: ShoppingEventRepositories;
}

export const makeSut = (): SutResult => {
  const { mockedShoppingEventRepository } = mockRepositories();

  const mockedEndShoppingEvent = new DbEndShoppingEvent(mockedShoppingEventRepository);

  const sut = new EndShoppingEventController(mockedEndShoppingEvent);

  return {
    sut,
    mockedEndShoppingEvent,
    mockedShoppingEventRepository,
  };
};

interface MockedEndShoppingEventControllerData {
  params: EndShoppingEventControllerRequest;
  result: object;
}

export const mockedEndShoppingEventControllerData = (): MockedEndShoppingEventControllerData => {
  const shoppingEventId = '56fef00b-ab5b-423a-ac89-a3c7e9586789';
  const params: EndShoppingEventControllerRequest = {
    shoppingEventId,
  };

  const { shoppingEvent } = mockShoppingEvent(shoppingEventId);

  const result = {
    id: shoppingEvent.id,
    status: shoppingEvent.status,
    market: {
      id: shoppingEvent.marketId,
      name: shoppingEvent.market?.name,
    },
    calculatedTotals: shoppingEvent.getCalculatedTotals(),
    createdAt: shoppingEvent.createdAt,
    finishedAt: shoppingEvent.finishedAt,
    createdBy: shoppingEvent.createdBy,
  };

  return {
    params,
    result,
  };
};
