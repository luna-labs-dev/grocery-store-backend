import { GetMarketByCodeRepository } from './get-market-by-code-repository';
import { GetMarketByIdRepository } from './get-market-by-id-repository';
import { GetMarketListRepository } from './get-market-list-repository';
import { NewMarketRepository } from './new-market-repository';
import { UpdateMarketRepository } from './update-market-repository';

export type MarketRepositories = NewMarketRepository &
  UpdateMarketRepository &
  GetMarketByCodeRepository &
  GetMarketByIdRepository &
  GetMarketListRepository;

export * from './new-market-repository';
export * from './get-market-by-code-repository';
export * from './get-market-by-id-repository';
export * from './update-market-repository';
export * from './get-market-list-repository';
