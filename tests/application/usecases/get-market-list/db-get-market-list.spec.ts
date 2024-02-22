import 'reflect-metadata';
import { MakeSut, mockGetMarketList } from './mockes';

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
  it.todo('shoud return UnexpectedError if GetMarketListRepository.count throws', () => {});
  it.todo('shoud an empty list if GetMarketListRepository.count returns 0', () => {});
  it.todo('shoud call GetMarketListRepository.getAll with correct values', () => {});
  it.todo('shoud return UnexpectedError if GetMarketListRepository.getAll throws', () => {});
  it.todo('shoud return a market list on success', () => {});
});
