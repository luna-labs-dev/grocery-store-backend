import 'reflect-metadata';

import { mockMarket } from 'tests/mocks/market';

import { makeSut, mockedGetMarketListControllerObjects } from './mocks';

import { left, MarketNotFoundError, UnexpectedError } from '@/domain';
import { notFound, ok, serverError } from '@/api';

describe('GetMarketListController', () => {
  it('shoud call GetMarketList usecase with correct values', async () => {
    // Arrange
    const { sut, mockedGetMarketList } = makeSut();
    const getMarketListSpy = vi.spyOn(mockedGetMarketList, 'execute');
    const { params } = mockedGetMarketListControllerObjects();

    // Act
    await sut.handle(params);

    // Assert
    expect(getMarketListSpy).toHaveBeenCalledWith(params);
  });

  it('shoud return 404 - NotFound if GetMarketList usecase return MarketNotFoundError', async () => {
    // Arrange
    const { sut, mockedGetMarketList } = makeSut();
    vi.spyOn(mockedGetMarketList, 'execute').mockResolvedValueOnce(left(new MarketNotFoundError()));
    const { params } = mockedGetMarketListControllerObjects();

    // Act
    const response = await sut.handle(params);

    // Assert
    expect(response).toEqual(notFound(new MarketNotFoundError()));
  });

  it('shoud return 500 - ServerError if GetMarketList usecase return UnexpectedError', async () => {
    // Arrange
    const { sut, mockedGetMarketList } = makeSut();
    vi.spyOn(mockedGetMarketList, 'execute').mockResolvedValueOnce(left(new UnexpectedError()));
    const { params } = mockedGetMarketListControllerObjects();

    // Act
    const response = await sut.handle(params);

    // Assert
    expect(response).toEqual(serverError(new UnexpectedError()));
  });

  it('shoud return 200 - Ok on success', async () => {
    // Arrange
    const { sut } = makeSut();

    const { params } = mockedGetMarketListControllerObjects();
    const { mappedMarket } = mockMarket();

    // Act
    const response = await sut.handle(params);

    // Assert
    expect(response).toEqual(
      ok({
        total: 1,
        markets: expect.arrayContaining([mappedMarket]),
      }),
    );
  });
});
