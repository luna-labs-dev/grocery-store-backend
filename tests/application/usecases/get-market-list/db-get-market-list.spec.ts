import 'reflect-metadata';
import { MakeSut, mockGetMarketList } from './mockes';

import { GetMarketListResult, left, right, UnexpectedError } from '@/domain';

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

  it('shoud call GetMarketListRepository.getAll with correct values', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = MakeSut();
    const repositorySpy = vi.spyOn(mockedMarketRepository, 'getAll');
    const { paginatedParams } = mockGetMarketList();

    // Act
    await sut.execute(paginatedParams);

    // Assert
    expect(repositorySpy).toBeCalledWith(paginatedParams);
  });

  it('shoud return UnexpectedError if GetMarketListRepository.getAll throws', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = MakeSut();
    vi.spyOn(mockedMarketRepository, 'getAll').mockImplementationOnce(() => {
      throw new Error('something went wrong with the database');
    });
    const { paginatedParams } = mockGetMarketList();

    // Act
    const response = await sut.execute(paginatedParams);

    // Assert
    expect(response).toEqual(left(new UnexpectedError()));
  });

  it('shoud return a market list on success', async () => {
    // Arrange
    const { sut } = MakeSut();
    const { paginatedParams } = mockGetMarketList();

    // Act

    const response = await sut.execute(paginatedParams);

    // Assert
    expect(response.isRight()).toBe(true);
    expect((response.value as GetMarketListResult).total).toBeGreaterThan(0);
    expect((response.value as GetMarketListResult).markets.length).toBeGreaterThan(0);
  });
});
