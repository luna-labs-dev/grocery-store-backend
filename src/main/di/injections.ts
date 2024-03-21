import { container } from 'tsyringe';

import {
  AuthorizationControllerDecorator,
  ErrorHandlingControllerDecorator,
  ValidationControllerDecorator,
} from '../decorators';

import { injection } from './injection-codes';

import {
  PrismaMarketRepository,
  PrismaProductRepository,
  PrismaShoppingEventRepository,
} from '@/infrastructure';
import {
  AddMarket,
  AddProductToCart,
  EndShoppingEvent,
  GetMarketList,
  GetShoppingEventById,
  GetShoppingEventList,
  RemoveProductFromCart,
  StartShoppingEvent,
  UpdateMarket,
  UpdateProductInCart,
} from '@/domain';
import {
  DbAddMarket,
  DbAddProductToCart,
  DbEndShoppingEvent,
  DbGetMarketList,
  DbGetShoppingEventById,
  DbGetShoppingEventList,
  DbRemoveProductFromCart,
  DbStartShoppingEvent,
  DbUpdateMarket,
} from '@/application';
import {
  MarketRepositories,
  ProductRepositories,
  ShoppingEventRepositories,
} from '@/application/contracts';
import {
  AddMarketController,
  addMarketRequestSchema,
  AddProductToCartController,
  addProductToCartRequestSchema,
  Controller,
  EndShoppingEventController,
  EndShoppingEventRequestSchema,
  GetMarketListController,
  getMarketListRequestSchema,
  GetShoppingEventByIdController,
  getShoppingEventByIdRequestSchema,
  GetShoppingEventListController,
  getShoppingEventListRequestSchema,
  RemoveProductFromCartController,
  removeProductFromCartRequestSchema,
  StartShoppingEventController,
  StartShoppingEventRequestSchema,
  UpdateMarketController,
  updateMarketRequestSchema,
  UpdateProductInCartController,
  updateProductInCartRequestSchema,
} from '@/api';
import { DbUpdateProductInCart } from '@/application/usecases/db-update-product-in-cart';

const { infra, usecases, controllers } = injection;
// Infra
container.register<MarketRepositories>(infra.marketRepositories, PrismaMarketRepository);
container.register<ShoppingEventRepositories>(
  infra.shoppingEventRepositories,
  PrismaShoppingEventRepository,
);
container.register<ProductRepositories>(infra.productRepositories, PrismaProductRepository);

// Usecases
container.register<AddMarket>(usecases.newMarket, DbAddMarket);
container.register<UpdateMarket>(usecases.updateMarket, DbUpdateMarket);
container.register<GetMarketList>(usecases.getMarketList, DbGetMarketList);
container.register<StartShoppingEvent>(usecases.startShoppingEvent, DbStartShoppingEvent);
container.register<EndShoppingEvent>(usecases.endShoppingEvent, DbEndShoppingEvent);
container.register<GetShoppingEventList>(usecases.getShoppingEventList, DbGetShoppingEventList);
container.register<GetShoppingEventById>(usecases.getShoppingEventById, DbGetShoppingEventById);
container.register<AddProductToCart>(usecases.addProductToCart, DbAddProductToCart);
container.register<UpdateProductInCart>(usecases.updateProductInCart, DbUpdateProductInCart);
container.register<RemoveProductFromCart>(usecases.removeProductFromCart, DbRemoveProductFromCart);

// Api
container.register<Controller>(controllers.newMarket, {
  useValue: new AuthorizationControllerDecorator(
    new ErrorHandlingControllerDecorator(
      new ValidationControllerDecorator(
        new AddMarketController(container.resolve(usecases.newMarket)),
        addMarketRequestSchema,
      ),
    ),
  ),
});

container.register<Controller>(controllers.updateMarket, {
  useValue: new AuthorizationControllerDecorator(
    new ErrorHandlingControllerDecorator(
      new ValidationControllerDecorator(
        new UpdateMarketController(container.resolve(usecases.updateMarket)),
        updateMarketRequestSchema,
      ),
    ),
  ),
});

container.register<Controller>(controllers.getMarketList, {
  useValue: new AuthorizationControllerDecorator(
    new ErrorHandlingControllerDecorator(
      new ValidationControllerDecorator(
        new GetMarketListController(container.resolve(usecases.getMarketList)),
        getMarketListRequestSchema,
      ),
    ),
  ),
});

container.register<Controller>(controllers.startShoppingEvent, {
  useValue: new AuthorizationControllerDecorator(
    new ErrorHandlingControllerDecorator(
      new ValidationControllerDecorator(
        new StartShoppingEventController(container.resolve(usecases.startShoppingEvent)),
        StartShoppingEventRequestSchema,
      ),
    ),
  ),
});

container.register<Controller>(controllers.endShoppingEvent, {
  useValue: new AuthorizationControllerDecorator(
    new ErrorHandlingControllerDecorator(
      new ValidationControllerDecorator(
        new EndShoppingEventController(container.resolve(usecases.endShoppingEvent)),
        EndShoppingEventRequestSchema,
      ),
    ),
  ),
});

container.register<Controller>(controllers.getShoppingEventList, {
  useValue: new AuthorizationControllerDecorator(
    new ErrorHandlingControllerDecorator(
      new ValidationControllerDecorator(
        new GetShoppingEventListController(container.resolve(usecases.getShoppingEventList)),
        getShoppingEventListRequestSchema,
      ),
    ),
  ),
});

container.register<Controller>(controllers.getShoppingEventById, {
  useValue: new AuthorizationControllerDecorator(
    new ErrorHandlingControllerDecorator(
      new ValidationControllerDecorator(
        new GetShoppingEventByIdController(container.resolve(usecases.getShoppingEventById)),
        getShoppingEventByIdRequestSchema,
      ),
    ),
  ),
});

container.register<Controller>(controllers.addProductToCart, {
  useValue: new AuthorizationControllerDecorator(
    new ErrorHandlingControllerDecorator(
      new ValidationControllerDecorator(
        new AddProductToCartController(container.resolve(usecases.addProductToCart)),
        addProductToCartRequestSchema,
      ),
    ),
  ),
});

container.register<Controller>(controllers.updateProductInCart, {
  useValue: new AuthorizationControllerDecorator(
    new ErrorHandlingControllerDecorator(
      new ValidationControllerDecorator(
        new UpdateProductInCartController(container.resolve(usecases.updateProductInCart)),
        updateProductInCartRequestSchema,
      ),
    ),
  ),
});

container.register<Controller>(controllers.removeProductFromCart, {
  useValue: new AuthorizationControllerDecorator(
    new ErrorHandlingControllerDecorator(
      new ValidationControllerDecorator(
        new RemoveProductFromCartController(container.resolve(usecases.removeProductFromCart)),
        removeProductFromCartRequestSchema,
      ),
    ),
  ),
});
