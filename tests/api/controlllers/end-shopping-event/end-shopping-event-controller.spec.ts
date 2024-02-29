import 'reflect-metadata';
import * as mockDate from 'mockdate';

import { makeSut, mockedEndShoppingEventControllerData } from './mock';

import { left, MarketNotFoundError, UnexpectedError } from '@/domain';
import { notFound, ok, serverError } from '@/api';

describe('EndShoppingEventController', () => {
  beforeAll(() => {
    mockDate.set(new Date());
  });

  afterAll(() => {
    mockDate.reset();
  });
  it('shoud call EndShopping usecase with correct values', async () => {
    // Arrange
    const { sut, mockedEndShoppingEvent } = makeSut();

    const endShoppingEventSpy = vi.spyOn(mockedEndShoppingEvent, 'execute');

    const { params } = mockedEndShoppingEventControllerData();
    // Act
    await sut.handle(params);

    // Assert
    expect(endShoppingEventSpy).toHaveBeenCalledWith(params);
  });

  it('shoud return 404 - NotFound if EndShopping usecase returns MarketNotFoundError', async () => {
    // Arrange
    const { sut, mockedEndShoppingEvent } = makeSut();

    vi.spyOn(mockedEndShoppingEvent, 'execute').mockResolvedValueOnce(
      left(new MarketNotFoundError()),
    );

    const { params } = mockedEndShoppingEventControllerData();

    // Act
    const response = await sut.handle(params);

    // Assert
    expect(response).toEqual(notFound(new MarketNotFoundError()));
  });

  it('shoud return 500 - ServerError if EndShopping usecase returns UnexpectedError', async () => {
    // Arrange
    const { sut, mockedEndShoppingEvent } = makeSut();

    vi.spyOn(mockedEndShoppingEvent, 'execute').mockResolvedValueOnce(left(new UnexpectedError()));

    const { params } = mockedEndShoppingEventControllerData();

    // Act
    const response = await sut.handle(params);

    // Assert
    expect(response).toEqual(serverError(new UnexpectedError()));
  });

  it('shoud return 200 - Ok on success', async () => {
    // Arrange
    const { sut } = makeSut();

    const { params, result } = mockedEndShoppingEventControllerData();

    // Act
    const response = await sut.handle(params);

    // Assert
    expect(response).toEqual(
      ok(
        expect.objectContaining({
          ...result,
          id: expect.any(String),
          status: 'FINISHED',
          finishedAt: new Date(),
        }),
      ),
    );
  });
});
