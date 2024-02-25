import 'reflect-metadata';

import { makeSut, MockedStartShoppingEventData } from './mocks';

import { left, MarketNotFoundError, UnexpectedError } from '@/domain';

describe('DbStartShoppingEvent', () => {
  it('shoud call GetMarketByIdRepository with correct id', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();

    const marketRepositorySpy = vi.spyOn(mockedMarketRepository, 'getById');

    const { marketId, params } = MockedStartShoppingEventData();

    // Act
    await sut.execute(params);

    // Assert
    expect(marketRepositorySpy).toHaveBeenCalledWith({ id: marketId });
  });

  it('shoud return UnexpectedError if GetMarketByIdRepository throws', async () => {
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

  it('shoud return MarketNotFoundError if GetMarketByIdRepository returns undefined', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();

    vi.spyOn(mockedMarketRepository, 'getById').mockResolvedValueOnce(undefined);

    const { params } = MockedStartShoppingEventData();

    // Act
    const response = await sut.execute(params);

    // Assert
    expect(response).toEqual(left(new MarketNotFoundError()));
  });

  it('shoud call AddShoppingEventRepository with correct values', async () => {
    // Arrange
    const { sut, mockedShoppingEventRepository } = makeSut();

    const shoppingEventRepositorySpy = vi.spyOn(mockedShoppingEventRepository, 'add');

    const { params, shoppingEvent } = MockedStartShoppingEventData();

    // Act
    await sut.execute(params);

    // Assert
    expect(shoppingEventRepositorySpy).toHaveBeenCalledWith(
      expect.objectContaining(shoppingEvent.props),
    );
    expect(shoppingEventRepositorySpy).toHaveBeenCalledWith(
      expect.objectContaining({ id: expect.any(String) }),
    );
  });

  it.todo('shoud return UnexpectedError if AddShoppingEventRepository throws', () => {});

  it.todo('shoud return the created shoppingEvent with the correct values', () => {});
});
