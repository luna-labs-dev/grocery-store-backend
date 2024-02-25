import 'reflect-metadata';

import { makeSut, MockedStartShoppingEventData } from './mocks';

describe('DbStartShoppingEvent', () => {
  it('shoud call GetMarketById with correct id', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();

    const marketRepositorySpy = vi.spyOn(mockedMarketRepository, 'getById');

    const { marketId, params } = MockedStartShoppingEventData();

    // Act
    await sut.execute(params);

    // Assert
    expect(marketRepositorySpy).toHaveBeenCalledWith({ id: marketId });
  });

  it.todo('shoud return UnexpectedError if GetMarketById throws', () => {});

  it.todo('shoud return MarketNotFoundError if GetMarketById returns undefined', () => {});

  it.todo('shoud call AddShoppingEvent with correct values', () => {});

  it.todo('shoud return UnexpectedError if AddShoppingEvent throws', () => {});

  it.todo('shoud return the created shoppingEvent with the correct values', () => {});
});
