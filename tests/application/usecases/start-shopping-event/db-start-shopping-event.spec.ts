import 'reflect-metadata';

import { makeSut, MockedStartShoppingEventData } from './mocks';

import { left, MarketNotFoundError, UnexpectedError } from '@/domain';

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

  it('shoud return UnexpectedError if GetMarketById throws', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();

    vi.spyOn(mockedMarketRepository, 'getById').mockImplementationOnce(() => {
      throw new Error('Something went wrong with the database');
    });

    const { params } = MockedStartShoppingEventData();

    // Act
    const response = await sut.execute(params);

    // Assert
    expect(response).toEqual(left(new UnexpectedError()));
  });

  it('shoud return MarketNotFoundError if GetMarketById returns undefined', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();

    vi.spyOn(mockedMarketRepository, 'getById').mockResolvedValueOnce(undefined);

    const { params } = MockedStartShoppingEventData();

    // Act
    const response = await sut.execute(params);

    // Assert
    expect(response).toEqual(left(new MarketNotFoundError()));
  });

  it.todo('shoud call AddShoppingEvent with correct values', () => {});

  it.todo('shoud return UnexpectedError if AddShoppingEvent throws', () => {});

  it.todo('shoud return the created shoppingEvent with the correct values', () => {});
});
