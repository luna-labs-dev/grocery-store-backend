import 'reflect-metadata';
import { makeSut } from './mocks';

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

  it('shoud return 422 - UnprocessableEntity if Market already exists', () => {
    // Arrange
    // Act
    // Assert
  });

  it('shoud return 200 - Ok on success', () => {
    // Arrange
    // Act
    // Assert
  });
});
