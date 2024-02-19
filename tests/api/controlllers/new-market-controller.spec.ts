import 'reflect-metadata';
import { makeSut } from './mocks';

import { Market, MarketAlreadyExistsError } from '@/domain';
import { badRequest } from '@/api';

describe('NewMarketController', () => {
  it('shoud call NewMarket usecase with correct values', async () => {
    // Arrange
    const { sut, mockedNewMarket } = makeSut();

    const newMarketSpy = vi.spyOn(mockedNewMarket, 'execute');

    // Act
    await sut.handle({
      user: 'tiagoluizpoli@gmail.com',
      name: 'Assai Carapicuiba',
    });

    // Assert
    expect(newMarketSpy).toHaveBeenCalledWith({
      user: 'tiagoluizpoli@gmail.com',
      name: 'Assai Carapicuiba',
    });
  });

  it('shoud return 400 - BadRequest if Market already exists', async () => {
    // Arrange
    const { sut, mockedMarketRepository } = makeSut();

    vi.spyOn(mockedMarketRepository, 'getByCode').mockResolvedValueOnce(
      Market.create({
        name: 'Assai Carapicuiba',
        createdAt: new Date(),
        createdBy: 'tiagoluizpoli@gmail.com',
      }),
    );

    // Act
    const response = await sut.handle({
      user: 'tiagoluizpoli@gmail.com',
      name: 'Assai Carapicuiba',
    });

    // Assert
    expect(response).toEqual(badRequest(new MarketAlreadyExistsError()));
  });

  it('shoud return 200 - Ok on success', () => {
    // Arrange
    // Act
    // Assert
  });
});
