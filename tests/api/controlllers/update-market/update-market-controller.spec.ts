import 'reflect-metadata';
import { makeSut, mockedUpdateMarketControllerParams } from './mocks';

import { left, MarketNotFoundError, UnexpectedError } from '@/domain';
import { notFound, serverError } from '@/api';

describe('UpdateMarketController', () => {
  it('shoud call UpdateMarket usecase with correct values', async () => {
    // Arrange
    const { sut, mockedUpdateMarket } = makeSut();
    const updateMarketSpy = vi.spyOn(mockedUpdateMarket, 'execute');
    const { params } = mockedUpdateMarketControllerParams();

    // Act
    await sut.handle(params);

    // Assert
    expect(updateMarketSpy).toHaveBeenCalledWith(params);
  });

  it('shoud return 404 - NotFound if UpdateMarket usecase return MarketNotFoundError', async () => {
    // Arrange
    const { sut, mockedUpdateMarket } = makeSut();
    vi.spyOn(mockedUpdateMarket, 'execute').mockResolvedValueOnce(left(new MarketNotFoundError()));
    const { params } = mockedUpdateMarketControllerParams();

    // Act
    const response = await sut.handle(params);

    // Assert
    expect(response).toEqual(notFound(new MarketNotFoundError()));
  });

  it('shoud return 500 - ServerError if UpdateMarket usecase return UnexpectedError ', async () => {
    // Arrange
    const { sut, mockedUpdateMarket } = makeSut();
    vi.spyOn(mockedUpdateMarket, 'execute').mockResolvedValueOnce(left(new UnexpectedError()));
    const { params } = mockedUpdateMarketControllerParams();

    // Act
    const response = await sut.handle(params);

    // Assert
    expect(response).toEqual(serverError(new UnexpectedError()));
  });

  it.todo('shoud return 200 - Ok on success', () => {
    // Arrange
    // Act
    // Assert
  });
});
