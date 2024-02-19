import { makeSut, mockParams } from './mocks';

import { nameToCode } from '@/domain/helper';
import { Market, MarketAlreadyExistsError, NewMarketErrors, UnexpectedError } from '@/domain';

describe('DbNewMarket', () => {
  it('shoud call GetMarketByCode with correct values', async () => {
    // Arrange
    const { sut, repository } = makeSut();

    const repositorySpy = vi.spyOn(repository, 'getByCode');

    const { newMarketParams } = mockParams();

    // Act
    await sut.execute(newMarketParams);

    // Assert
    expect(repositorySpy).toHaveBeenCalledWith({ code: nameToCode(newMarketParams.name) });
  });

  it('should return MarketAlreadyExistsError when code is found on database', async () => {
    // Arrange
    const { sut, repository } = makeSut();

    vi.spyOn(repository, 'getByCode').mockResolvedValueOnce(
      Market.create({
        name: 'Assai Carapicuiba',
        createdAt: new Date(),
        createdBy: 'tiagoluizpoli@gmail.com',
      }),
    );

    const { newMarketParams } = mockParams();

    // Act
    const response = await sut.execute(newMarketParams);

    // Assert

    expect(response.isLeft()).toBe(true);
    expect(response.value as NewMarketErrors).toEqual(new MarketAlreadyExistsError());
  });

  it('should return UnexpectedError if repository throws', async () => {
    // Arrange
    const { sut, repository } = makeSut();

    vi.spyOn(repository, 'create').mockImplementationOnce(() => {
      throw new Error('Something went wrong with the database');
    });

    const { newMarketParams } = mockParams();

    // Act
    const response = await sut.execute(newMarketParams);

    // Assert

    expect(response.isLeft()).toBe(true);
    expect(response.value as NewMarketErrors).toEqual(new UnexpectedError());
  });

  it('shoud create a new Market and return success', async () => {
    // Arrange
    const { sut } = makeSut();

    const { newMarketParams } = mockParams();

    // Act
    const response = await sut.execute(newMarketParams);

    // Assert
    expect(response.isRight()).toBe(true);
  });
});
