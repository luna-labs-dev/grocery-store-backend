import 'reflect-metadata';
import { MakeSut, mockGetMarketList } from './mockes';

import { left, right, UnexpectedError } from '@/domain';

describe('DbGetMarketList', () => {
  it('shoud call GetMarketListRepository.count with correct values', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = MakeSut();
    const repositorySpy = vi.spyOn(mockedMarketRepository, 'count');
    const { search, paginatedParams } = mockGetMarketList();
    // Act
    await sut.execute(paginatedParams);

    // Assert
    expect(repositorySpy).toHaveBeenCalledWith({
      search,
    });
  });

  it('shoud return UnexpectedError if GetMarketListRepository.count throws', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = MakeSut();
    vi.spyOn(mockedMarketRepository, 'count').mockImplementationOnce(() => {
      throw new Error('something went wrong with the database');
    });
    const { paginatedParams } = mockGetMarketList();
    // Act
    const response = await sut.execute(paginatedParams);

    // Assert
    expect(response).toEqual(left(new UnexpectedError()));
  });

  it('shoud an empty list if GetMarketListRepository.count returns 0', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = MakeSut();
    vi.spyOn(mockedMarketRepository, 'count').mockResolvedValueOnce(0);
    const { paginatedParams } = mockGetMarketList();

    // Act
    const response = await sut.execute(paginatedParams);

    // Assert
    expect(response).toEqual(right({ total: 0, markets: [] }));
  });

  it.todo('shoud call GetMarketListRepository.getAll with correct values', () => {});

  it.todo('shoud return UnexpectedError if GetMarketListRepository.getAll throws', () => {});

  it.todo('shoud return a market list on success', () => {});
});
