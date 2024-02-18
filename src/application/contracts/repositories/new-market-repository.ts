import { Market } from '@/domain';

export interface NewMarketRepository {
  create: (market: Market) => Promise<void>;
}
