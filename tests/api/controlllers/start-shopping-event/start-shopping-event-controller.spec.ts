import 'reflect-metadata';
import { makeSut, mockedStartShoppingEventControllerData } from './mock';

import { left, MarketNotFoundError } from '@/domain';
import { notFound } from '@/api';

describe('StartShoppingEventController', () => {
  it('shoud call StartShopping usecase with correct values', async () => {
    // Arrange
    const { sut, mockedStartShoppingEvent } = makeSut();

    const startShoppingEventSpy = vi.spyOn(mockedStartShoppingEvent, 'execute');

    const { params } = mockedStartShoppingEventControllerData();
    // Act
    await sut.handle(params);

    // Assert
    expect(startShoppingEventSpy).toHaveBeenCalledWith(params);
  });

  it('shoud return 404 - NotFound if StartShopping usecase returns MarketNotFoundError', async () => {
    // Arrange
    const { sut, mockedStartShoppingEvent } = makeSut();

    vi.spyOn(mockedStartShoppingEvent, 'execute').mockResolvedValueOnce(
      left(new MarketNotFoundError()),
    );

    const { params } = mockedStartShoppingEventControllerData();

    // Act
    const response = await sut.handle(params);

    // Assert
    expect(response).toEqual(notFound(new MarketNotFoundError()));
  });

  it.todo(
    'shoud return 500 - ServerError if StartShopping usecase returns UnexpectedError',
    () => {},
  );

  it.todo('shoud return 200 - Ok on success', () => {});
});
