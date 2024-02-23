import 'reflect-metadata';

import { makeSut, mockedGetMarketListControllerObjects } from './mocks';

import { left, MarketNotFoundError } from '@/domain';
import { notFound } from '@/api';

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

  it.todo(
    'shoud return 500 - ServerError if GetMarketList usecase return UnexpectedError',
    () => {},
  );

  it.todo('shoud return 200 - Ok on success', () => {});
});
