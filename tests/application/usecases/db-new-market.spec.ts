import { makeSut, mockParams } from './mocks';

import { nameToCode } from '@/domain/helper';
import { Market, MarketAlreadyExistsError, NewMarketErrors, UnexpectedError } from '@/domain';

describe('DbNewMarket', () => {
  it('shoud call GetMarketByCode with correct values', async () => {
    // Arrange
    const { sut, marketRepository } = makeSut();

    const repositorySpy = vi.spyOn(marketRepository, 'getByCode');

    const { newMarketParams } = mockParams();

    // Act
    await sut.execute(newMarketParams);

    // Assert
    expect(repositorySpy).toHaveBeenCalledWith({ code: nameToCode(newMarketParams.name) });
  });

  it('should return MarketAlreadyExistsError when code is found on database', async () => {
    // Arrange
    const { sut, marketRepository } = makeSut();

    vi.spyOn(marketRepository, 'getByCode').mockResolvedValueOnce(
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
    const { sut, marketRepository } = makeSut();

    vi.spyOn(marketRepository, 'new').mockImplementationOnce(() => {
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
    expect(response.value).instanceOf(Market);
    expect((response.value as Market).code).toBe(nameToCode(newMarketParams.name));
    expect((response.value as Market).name).toBe(newMarketParams.name);
  });
});
