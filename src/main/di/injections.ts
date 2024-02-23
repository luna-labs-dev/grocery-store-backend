import { container } from 'tsyringe';

import { ErrorHandlingControllerDecorator, ValidationControllerDecorator } from '../decorators';

import { injection } from './injection-codes';

import { PrismaMarketRepository } from '@/infrastructure';
import { GetMarketList, NewMarket, UpdateMarket } from '@/domain';
import { DbGetMarketList, DbNewMarket, DbUpdateMarket, MarketRepositories } from '@/application';
import {
  Controller,
  GetMarketListController,
  getMarketListRequestSchema,
  NewMarketController,
  newMarketRequestSchema,
  UpdateMarketController,
  updateMarketRequestSchema,
} from '@/api';

const { infra, usecases, controllers } = injection;
// Infra
container.register<MarketRepositories>(infra.marketRepositories, PrismaMarketRepository);

// Usecases
container.register<NewMarket>(usecases.newMarket, DbNewMarket);
container.register<UpdateMarket>(usecases.updateMarket, DbUpdateMarket);
container.register<GetMarketList>(usecases.getMarketList, DbGetMarketList);

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
