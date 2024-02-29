import 'reflect-metadata';

import { mockShoppingEvent } from 'tests/mocks/shopping-event';
import * as mockDate from 'mockdate';

import { makeSut, mockEndShoppingEventData } from './mocks';

import { left, ShoppingEventNotFoundError, UnexpectedError } from '@/domain';

describe('DbEndShoppingEvent', () => {
  beforeAll(() => {
    mockDate.set(new Date());
  });

  afterAll(() => {
    mockDate.reset();
  });

  it('shoud call GetShoppingEventByIdRepository with correct values', async () => {
    // Arrange
    const { sut, mockedShoppingEventRepository } = makeSut();

    const shoppingEventRepositorySpy = vi.spyOn(mockedShoppingEventRepository, 'getById');

    const { params } = mockEndShoppingEventData();

    // Act
    await sut.execute(params);

    // Assert
    expect(shoppingEventRepositorySpy).toHaveBeenCalledWith(params);
  });

  it('shoud return UnexpectedError if GetShoppingEventByIdRepository throws', async () => {
    // Arrange
    const { sut, mockedShoppingEventRepository } = makeSut();

    vi.spyOn(mockedShoppingEventRepository, 'getById').mockImplementationOnce(() => {
      throw new Error('something went wrong with the database');
    });

    const { params } = mockEndShoppingEventData();

    // Act
    const response = await sut.execute(params);

    // Assert
    expect(response).toEqual(left(new UnexpectedError()));
  });

  it('shoud return ShoppingEventNotFoundError if GetShoppingEventByIdRepository returns undefined', async () => {
    // Arrange
    const { sut, mockedShoppingEventRepository } = makeSut();

    vi.spyOn(mockedShoppingEventRepository, 'getById').mockResolvedValueOnce(undefined);

    const { params } = mockEndShoppingEventData();

    // Act
    const response = await sut.execute(params);

    // Assert
    expect(response).toEqual(left(new ShoppingEventNotFoundError()));
  });

  it('should call UpdateShoppingEventRepository with correct values', async () => {
    // Arrange
    const { sut, mockedShoppingEventRepository } = makeSut();

    const shoppingEventRepositorySpy = vi.spyOn(mockedShoppingEventRepository, 'update');

    const { shoppingEvent } = mockShoppingEvent();
    const { params } = mockEndShoppingEventData();

    // Act
    await sut.execute(params);

    // Assert
    expect(shoppingEventRepositorySpy).toHaveBeenCalledWith(
      expect.objectContaining({
        ...shoppingEvent.props,
        status: 'FINISHED',
        finishedAt: new Date(),
      }),
    );
  });

  it('shoud return UnexpectedError if UpdateShoppingEventRepository throws', async () => {
    // Arrange
    const { sut, mockedShoppingEventRepository } = makeSut();

    vi.spyOn(mockedShoppingEventRepository, 'update').mockImplementationOnce(() => {
      throw new Error('Something went wrong with the database');
    });

    const { params } = mockEndShoppingEventData();

    // Act
    const response = await sut.execute(params);

    // Assert
    expect(response).toEqual(left(new UnexpectedError()));
  });

  it.todo('shoud return the ended ShoppingEvent on success', () => {});
});
