import 'reflect-metadata';

import { databaseError } from 'tests/mocks/errors';

import { makeSut, mockEndShoppingEventData } from './mocks';

import { left, UnexpectedError } from '@/domain';

describe('GetShoppingEventList', () => {
  it('shoud call GetShoppingEventListRepository.count with the correct values', async () => {
    // Arrange
    const { sut, mockedShoppingEventRepository } = makeSut();

    const shoppingEventRepositorySpy = vi.spyOn(mockedShoppingEventRepository, 'count');

    const { params, repositoryParams } = mockEndShoppingEventData();

    // Act
    await sut.execute(params);

    // Assert
    expect(shoppingEventRepositorySpy).toHaveBeenCalledWith(repositoryParams);
  });

  it('shoud return UnexpectedError if GetShoppingEventListRepository.count throws', async () => {
    // Arrange
    const { sut, mockedShoppingEventRepository } = makeSut();

    vi.spyOn(mockedShoppingEventRepository, 'count').mockImplementationOnce(databaseError);

    const { params } = mockEndShoppingEventData();

    // Act
    const response = await sut.execute(params);

    // Assert
    expect(response).toEqual(left(new UnexpectedError()));
  });

  it.todo(
    'shoud return the list with an empty array if GetShoppingEventListRepository.count returns 0',
    () => {},
  );

  it.todo('shoud call GetShoppingEventListRepository.getAll with the correct values', () => {});

  it.todo('shoud return UnexpectedError if GetShoppingEventListRepository.getAll throws', () => {});

  it.todo('shoud return the fetched list on success', () => {});
});
