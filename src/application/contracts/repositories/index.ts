import { GetMarketByCodeRepository } from './get-market-by-code-repository';
import { GetMarketByIdRepository } from './get-market-by-id-repository';
import { NewMarketRepository } from './new-market-repository';

export type MarketRepositories = NewMarketRepository &
  GetMarketByCodeRepository &
  GetMarketByIdRepository;

export * from './new-market-repository';
export * from './get-market-by-code-repository';
export * from './get-market-by-id-repository';
