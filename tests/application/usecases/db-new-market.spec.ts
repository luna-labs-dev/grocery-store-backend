import { DbNewMarket, GetMarketByCodeRepositoryParams, NewMarketRepositories } from '@/application';
import {
  Market,
  MarketAlreadyExistsError,
  NewMarket,
  NewMarketErrors,
  UnexpectedError,
} from '@/domain';

const mockRepository = (): NewMarketRepositories => {
  class MockedNewMarketRepository implements NewMarketRepositories {
    getByCode = (params: GetMarketByCodeRepositoryParams): Promise<Market | undefined> => {
      return Promise.resolve(undefined);
    };

    create = (market: Market): Promise<void> => {
      return Promise.resolve();
    };
  }

  return new MockedNewMarketRepository();
};

interface SutResult {
  sut: NewMarket;
  repository: NewMarketRepositories;
}

const makeSut = (): SutResult => {
  const repository = mockRepository();
  const sut = new DbNewMarket(repository);

  return { sut, repository };
};

describe('DbNewMarket', () => {
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
    // Act
    const response = await sut.execute({
      name: 'Assai Carapicuiba',
      user: 'tiagoluizpoli@gmail.com',
    });

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
    // Act
    const response = await sut.execute({
      name: 'Assai Carapicuiba',
      user: 'tiagoluizpoli@gmail.com',
    });

    // Assert

    expect(response.isLeft()).toBe(true);
    expect(response.value as NewMarketErrors).toEqual(new UnexpectedError());
  });

  it('shoud create a new Market and return success', async () => {
    // Arrange
    const { sut } = makeSut();
    // Act
    const response = await sut.execute({
      name: 'Assai Carapicuiba',
      user: 'tiagoluizpoli@gmail.com',
    });

    // Assert

    expect(response.isRight()).toBe(true);
  });
});
