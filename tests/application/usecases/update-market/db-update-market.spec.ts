import 'reflect-metadata';

import { mockMarket } from 'tests/mocks/market';

import { makeSut } from './mocks';

import { MarketNotFoundError, UnexpectedError } from '@/domain';

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

  it('shoud return UnexpectedError if GetMarketByIdRepository throws', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();
    vi.spyOn(mockedMarketRepository, 'getById').mockImplementationOnce(() => {
      throw new Error('Something went wrong with the database');
    });
    const { id, market } = mockMarket();

    // Act
    const response = await sut.execute({
      marketId: id,
      name: market.name,
    });

    // Assert
    expect(response.isLeft()).toBe(true);
    expect(response.value).toEqual(new UnexpectedError());
  });

  it('shoud return MarketNotFoundError if GetMarketByIdRepository returns undefined', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();

    vi.spyOn(mockedMarketRepository, 'getById').mockResolvedValueOnce(undefined);
    const { id, market } = mockMarket();

    // Act
    const response = await sut.execute({
      marketId: id,
      name: market.name,
    });

    // Assert
    expect(response.isLeft()).toBe(true);
    expect(response.value).toEqual(new MarketNotFoundError());
  });

  it('shoud call UpdateMarketRepository with correct values', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();
    const repositorySpy = vi.spyOn(mockedMarketRepository, 'update');
    const { id, market } = mockMarket();

    // Act
    await sut.execute({
      marketId: id,
      name: 'Assai Cotia',
    });
    market.update({ name: 'Assai Cotia' });

    // Assert
    expect(repositorySpy).toHaveBeenCalledWith(market);
  });

  it('shoud return UnexpectedError if UpdateMarketRepository throws', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();
    vi.spyOn(mockedMarketRepository, 'update').mockImplementationOnce(() => {
      throw new Error('Something went wrong with the database');
    });
    const { id, market } = mockMarket();

    // Act
    const response = await sut.execute({
      marketId: id,
      name: market.name,
    });

    // Assert
    expect(response.isLeft()).toBe(true);
    expect(response.value).toEqual(new UnexpectedError());
  });

  it('shoud return an updated Market on success', async () => {
    // Arrange
    const { sut } = makeSut();

    const { id, market } = mockMarket();
    const newName = 'Assai Cotia';
    market.update({ name: newName });

    // Act

    const response = await sut.execute({
      marketId: id,
      name: newName,
    });

    // Assert
    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual(market);
  });
});
