import { mockRepositories } from 'tests/mocks/repositories';

import { UpdateMarketController, UpdateMarketControllerRequest } from '@/api';
import { DbUpdateMarket, MarketRepositories } from '@/application';
import { UpdateMarket } from '@/domain';

export interface sutResult {
  sut: UpdateMarketController;
  mockedUpdateMarket: UpdateMarket;
  mockedMarketRepository: MarketRepositories;
}

export const makeSut = (): sutResult => {
  const { mockedMarketRepository } = mockRepositories();
  const mockedUpdateMarket = new DbUpdateMarket(mockedMarketRepository);
  return {
    sut: new UpdateMarketController(mockedUpdateMarket),
    mockedUpdateMarket,
    mockedMarketRepository,
  };
};

export interface MockedUpdateMarketControllerParams {
  params: UpdateMarketControllerRequest;
}

export const mockedUpdateMarketControllerParams = (): MockedUpdateMarketControllerParams => {
  return {
    params: { marketId: '3feb9ece-c742-4357-80e6-1cb9053434ec', name: 'Assai Carapicuiba' },
  };
};
