import { container } from 'tsyringe';

import { ErrorHandlingControllerDecorator, ValidationControllerDecorator } from '../decorators';

import { injection } from './injection-codes';

import { MarketRepositories, PrismaMarketRepository } from '@/infrastructure';
import { NewMarket } from '@/domain';
import { DbNewMarket } from '@/application';
import { Controller, NewMarketController, newMarketRequestSchema } from '@/api';

const { infra, usecases, controllers } = injection;
// Infra
container.register<MarketRepositories>(infra.marketRepositories, PrismaMarketRepository);

// Usecases
container.register<NewMarket>(usecases.newMarket, DbNewMarket);

// Api
container.register<Controller>(controllers.newMarket, {
  useValue: new ErrorHandlingControllerDecorator(
    new ValidationControllerDecorator(
      new NewMarketController(container.resolve(usecases.newMarket)),
      newMarketRequestSchema,
    ),
  ),
});
