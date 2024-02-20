import { Market } from '@/domain';

interface MockMarketResult {
  id: string;
  code: string;
  market: Market;
  existingMarket: Market;
}

export const mockMarket = (): MockMarketResult => {
  const id = 'd1f72237-6d41-4e2b-b45e-c726168f0386';
  const market = Market.create(
    {
      name: 'Assai Carapicuiba',
      createdAt: new Date(),
      createdBy: 'mock@email.com',
    },
    id,
  );

  const existingMarket = Market.create({
    name: 'Assai Carapicuiba',
    createdAt: new Date(),
    createdBy: 'mock@email.com',
  });

  return {
    id,
    code: market.code,
    market,
    existingMarket,
  };
};
