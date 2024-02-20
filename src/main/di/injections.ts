import { container } from 'tsyringe';

import { ErrorHandlingControllerDecorator, ValidationControllerDecorator } from '../decorators';

import { injection } from './injection-codes';

import { MarketRepositories, PrismaMarketRepository } from '@/infrastructure';
import { NewMarket, UpdateMarket } from '@/domain';
import { DbNewMarket, DbUpdateMarket } from '@/application';
import {
  Controller,
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
