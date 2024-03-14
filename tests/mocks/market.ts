import { Market } from '@/domain';

interface MockMarketResult {
  id: string;
  code: string;
  market: Market;
  existingMarket: Market;
  mappedMarket: {
    id: string;
    code: string;
    name: string;
  };
}

export const mockMarket = (id?: string): MockMarketResult => {
  const localId = 'd1f72237-6d41-4e2b-b45e-c726168f0386';
  const market = Market.create(
    {
      name: 'Assai Carapicuiba',
      createdAt: new Date(),
      createdBy: 'mock@email.com',
    },
    id ?? localId,
  );

  const existingMarket = Market.create({
    name: 'Assai Carapicuiba',
    createdAt: new Date(),
    createdBy: 'mock@email.com',
  });

  return {
    id: localId,
    code: market.code,
    market,
    existingMarket,
    mappedMarket: {
      id: market.id,
      code: market.code,
      name: market.name,
    },
  };
};
