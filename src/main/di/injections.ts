import { container } from 'tsyringe';

import { ErrorHandlingControllerDecorator, ValidationControllerDecorator } from '../decorators';

import { injection } from './injection-codes';

import { PrismaMarketRepository } from '@/infrastructure';
import { GetMarketList, NewMarket, StartShoppingEvent, UpdateMarket } from '@/domain';
import {
  DbGetMarketList,
  DbNewMarket,
  DbStartShoppingEvent,
  DbUpdateMarket,
  MarketRepositories,
  ShoppingEventRepositories,
} from '@/application';
import {
  Controller,
  GetMarketListController,
  getMarketListRequestSchema,
  NewMarketController,
  newMarketRequestSchema,
  StartShoppingEventController,
  StartShoppingEventRequestSchema,
  UpdateMarketController,
  updateMarketRequestSchema,
} from '@/api';
import { PrismaShoppingEventRepository } from '@/infrastructure/prisma/shopping-event-repository';

const { infra, usecases, controllers } = injection;
// Infra
container.register<MarketRepositories>(infra.marketRepositories, PrismaMarketRepository);
container.register<ShoppingEventRepositories>(
  infra.shoppingEventRepositories,
  PrismaShoppingEventRepository,
);

// Usecases
container.register<NewMarket>(usecases.newMarket, DbNewMarket);
container.register<UpdateMarket>(usecases.updateMarket, DbUpdateMarket);
container.register<GetMarketList>(usecases.getMarketList, DbGetMarketList);
container.register<StartShoppingEvent>(usecases.startShoppingEvent, DbStartShoppingEvent);

// Api
container.register<Controller>(controllers.newMarket, {
  useValue: new ErrorHandlingControllerDecorator(
    new ValidationControllerDecorator(
      new NewMarketController(container.resolve(usecases.newMarket)),
      newMarketRequestSchema,
    ),
  ),
});

container.register<Controller>(controllers.updateMarket, {
  useValue: new ErrorHandlingControllerDecorator(
    new ValidationControllerDecorator(
      new UpdateMarketController(container.resolve(usecases.updateMarket)),
      updateMarketRequestSchema,
    ),
  ),
});

container.register<Controller>(controllers.getMarketList, {
  useValue: new ErrorHandlingControllerDecorator(
    new ValidationControllerDecorator(
      new GetMarketListController(container.resolve(usecases.getMarketList)),
      getMarketListRequestSchema,
    ),
  ),
});

container.register<Controller>(controllers.startShoppingEvent, {
  useValue: new ErrorHandlingControllerDecorator(
    new ValidationControllerDecorator(
      new StartShoppingEventController(container.resolve(usecases.startShoppingEvent)),
      StartShoppingEventRequestSchema,
    ),
  ),
});
