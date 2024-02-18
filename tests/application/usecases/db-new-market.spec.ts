import { DbNewMarket, NewMarketRepository } from '@/application';
import { Market } from '@/domain';

describe('DbNewMarket', () => {
  it.todo('should return MarketAlreadyExists when code is found on database');

  it('shoud create a new Market and return success', async () => {
    // Arrange
    class MockedNewMarketRepository implements NewMarketRepository {
      create = (market: Market): Promise<void> => {
        return Promise.resolve();
      };
    }

    const repository = new MockedNewMarketRepository();
    const sut = new DbNewMarket(repository);

    // Act
    const response = await sut.execute({
      name: 'Assai Carapicuiba',
      user: 'tiagoluizpoli@gmail.com',
    });

    // Assert

    expect(response.isRight()).toBe(true);
  });
});
