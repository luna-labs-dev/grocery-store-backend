import { mockRepositories } from 'tests/mocks/repositories';
import { mockMarket } from 'tests/mocks/market';

import {
  AddShoppingEventRepository,
  DbStartShoppingEvent,
  GetMarketByIdRepository,
} from '@/application';
import { ShoppingEvent, StartShoppingEvent, StartShoppingEventParams } from '@/domain';
import { Products } from '@/domain/entities/products';

interface SutResult {
  sut: StartShoppingEvent;
  mockedMarketRepository: GetMarketByIdRepository;
  mockedShoppingEventRepository: AddShoppingEventRepository;
}

export const makeSut = (): SutResult => {
  const { mockedMarketRepository, mockedShoppingEventRepository } = mockRepositories();

  const sut = new DbStartShoppingEvent(mockedMarketRepository, mockedShoppingEventRepository);

  return {
    sut,
    mockedMarketRepository,
    mockedShoppingEventRepository,
  };
};

interface MockedStartShoppingEventDataType {
  marketId: string;
  user: string;
  params: StartShoppingEventParams;
  shoppingEvent: ShoppingEvent;
}

export const MockedStartShoppingEventData = (): MockedStartShoppingEventDataType => {
  const user = 'some-user@email.com';
  const marketId = '69919c3e-fa2f-414d-be9e-6c6c85083b63';

  const { market } = mockMarket(marketId);

  const params: StartShoppingEventParams = {
    user,
    marketId,
  };

  const shoppingEvent = ShoppingEvent.create({
    marketId,
    market,
    status: 'ONGOING',
    createdAt: new Date(),
    createdBy: user,
    products: Products.create([]),
  });

  return {
    marketId,
    user,
    params,
    shoppingEvent,
  };
};
