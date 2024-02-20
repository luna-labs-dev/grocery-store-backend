import 'reflect-metadata';

import { mockMarket } from 'tests/mocks/market';

import { makeSut } from './mocks';

describe('DbUpdateMarket', () => {
  it('shoud call GetMarketByIdRepository with correct id', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();
    const repositorySpy = vi.spyOn(mockedMarketRepository, 'getById');
    const { id, market } = mockMarket();

    // Act
    await sut.execute({
      marketId: id,
      name: market.name,
    });

    // Assert
    expect(repositorySpy).toHaveBeenCalledWith({ id });
  });

  it.todo('shoud return UnexpectedError if GetMarketByIdRepository throws', () => {
    // Arrange
    // Act
    // Assert
  });

  it.todo('shoud return MarketNotFoundError if GetMarketByIdRepository returns undefined', () => {
    // Arrange
    // Act
    // Assert
  });

  it.todo('shoud call UpdateMarketRepository with correct values', () => {
    // Arrange
    // Act
    // Assert
  });

  it.todo('shoud return UnexpectedError if UpdateMarketRepository throws', () => {
    // Arrange
    // Act
    // Assert
  });

  it.todo('shoud return an updated Market on success', () => {
    // Arrange
    // Act
    // Assert
  });
});
