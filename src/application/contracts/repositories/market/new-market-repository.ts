import { Market } from '@/domain';

export interface NewMarketRepository {
  new: (market: Market) => Promise<void>;
}
