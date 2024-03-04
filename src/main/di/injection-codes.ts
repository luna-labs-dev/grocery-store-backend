export const injection = {
  infra: {
    marketRepositories: 'market-repositories',
    shoppingEventRepositories: 'shopping-event-repositories',
  },
  usecases: {
    newMarket: 'new-market-usecase',
    updateMarket: 'update-market-usecase',
    getMarketList: 'get-market-list-usecase',
    startShoppingEvent: 'start-shopping-event-usecase',
    endShoppingEvent: 'end-shopping-event-usecase',
    getShoppingEventList: 'get-shopping-event-list-usecase',
  },
  controllers: {
    newMarket: 'new-market-controller',
    updateMarket: 'update-market-controller',
    getMarketList: 'get-market-list-controller',
    startShoppingEvent: 'start-shopping-event-controller',
    endShoppingEvent: 'end-shopping-event-controller',
    getShoppingEventList: 'get-shopping-event-list-controller',
  },
};
