import 'reflect-metadata';
import { makeSut } from './mocks';

import { left, Market, MarketAlreadyExistsError, UnexpectedError } from '@/domain';
import { badRequest, serverError } from '@/api';
import { nameToCode } from '@/domain/helper';

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

  it('shoud return 500 - ServerError NewMarket usecase return UnexpectedError', async () => {
    // Arrange
    const { sut, mockedNewMarket } = makeSut();

    vi.spyOn(mockedNewMarket, 'execute').mockResolvedValueOnce(left(new UnexpectedError()));

    // Act
    const response = await sut.handle({
      user: 'tiagoluizpoli@gmail.com',
      name: 'Assai Carapicuiba',
    });

    // Assert
    expect(response).toEqual(serverError(new UnexpectedError()));
  });

  it('shoud return 200 - Ok on success', async () => {
    // Arrange
    const { sut } = makeSut();

    // Act
    const response = await sut.handle({
      user: 'tiagoluizpoli@gmail.com',
      name: 'Assai Carapicuiba',
    });

    // Assert
    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Assai Carapicuiba');
    expect(response.body.code).toBe(nameToCode('Assai Carapicuiba'));
  });
});
