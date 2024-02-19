import { GetMarketByCodeRepository } from './get-market-by-code-repository';
import { NewMarketRepository } from './new-market-repository';

export * from './new-market-repository';
export * from './get-market-by-code-repository';

export type MarketRepositories = NewMarketRepository & GetMarketByCodeRepository;
