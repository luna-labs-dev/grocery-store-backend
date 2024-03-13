import 'reflect-metadata';
import { makeSut, mockParams } from './mocks';

import { nameToCode } from '@/domain/helper';
import { AddMarketErrors, Market, MarketAlreadyExistsError, UnexpectedError } from '@/domain';

describe('DbNewMarket', () => {
  it('shoud call GetMarketByCode with correct values', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();

    const repositorySpy = vi.spyOn(mockedMarketRepository, 'getByCode');

    const { newMarketParams } = mockParams();

    // Act
    await sut.execute(newMarketParams);

    // Assert
    expect(repositorySpy).toHaveBeenCalledWith({ code: nameToCode(newMarketParams.name) });
  });

  it('should return MarketAlreadyExistsError when code is found on database', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();

    vi.spyOn(mockedMarketRepository, 'getByCode').mockResolvedValueOnce(
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
    expect(response.value as AddMarketErrors).toEqual(new MarketAlreadyExistsError());
  });

  it('should return UnexpectedError if repository throws', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();

    vi.spyOn(mockedMarketRepository, 'add').mockImplementationOnce(() => {
      throw new Error('Something went wrong with the database');
    });

    const { newMarketParams } = mockParams();

    // Act
    const response = await sut.execute(newMarketParams);

    // Assert

    expect(response.isLeft()).toBe(true);
    expect(response.value as AddMarketErrors).toEqual(new UnexpectedError());
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
