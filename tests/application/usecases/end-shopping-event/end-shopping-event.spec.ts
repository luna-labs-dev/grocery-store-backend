import 'reflect-metadata';

import { makeSut } from './mocks';

describe('DbEndShoppingEvent', () => {
  it('shoud call GetShoppingEventByIdRepository with correct values', async () => {
    // Arrange
    const { sut, mockedShoppingEventRepository } = makeSut();

    const shoppingEventRepositorySpy = vi.spyOn(mockedShoppingEventRepository, 'getById');

    // Act
    await sut.execute({
      shoppingEventId: '09cde9b9-b54e-4c8a-b87b-f9efec57c893',
    });

    // Assert
    expect(shoppingEventRepositorySpy).toHaveBeenCalledWith({
      shoppingEventId: '09cde9b9-b54e-4c8a-b87b-f9efec57c893',
    });
  });

  it.todo('shoud return UnexpectedError if GetShoppingEventByIdRepository throws', () => {});

  it.todo(
    'shoud return ShoppingEventNotFoundError if GetShoppingEventByIdRepository returns undefined',
    () => {},
  );

  it.todo('should call UpdateShoppingEventRepository with correct values', () => {});

  it.todo('shoud return UnexpectedError if UpdateShoppingEventRepository throws', () => {});

  it.todo('shoud return the ended ShoppingEvent on success', () => {});
});
