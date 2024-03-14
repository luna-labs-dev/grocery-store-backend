import { Market } from '@/domain';

export interface AddMarketRepository {
  add: (market: Market) => Promise<void>;
}
