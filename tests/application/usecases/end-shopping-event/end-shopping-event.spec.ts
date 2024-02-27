import 'reflect-metadata';

import { makeSut, mockEndShoppingEventData } from './mocks';

import { left, ShoppingEventNotFoundError, UnexpectedError } from '@/domain';

describe('DbEndShoppingEvent', () => {
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

  it.todo('should call UpdateShoppingEventRepository with correct values', () => {});

  it.todo('shoud return UnexpectedError if UpdateShoppingEventRepository throws', () => {});

  it.todo('shoud return the ended ShoppingEvent on success', () => {});
});
