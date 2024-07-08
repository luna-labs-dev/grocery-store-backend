import { container } from 'tsyringe';

import {
  AuthorizationControllerDecorator,
  ErrorHandlingControllerDecorator,
  ValidationControllerDecorator,
} from '../decorators';

import { injection } from './injection-codes';

import {
  AddMarketController,
  AddProductToCartController,
  Controller,
  EndShoppingEventController,
  EndShoppingEventRequestSchema,
  GetMarketByIdController,
  GetMarketListController,
  GetShoppingEventByIdController,
  GetShoppingEventListController,
  RemoveProductFromCartController,
  StartShoppingEventController,
  StartShoppingEventRequestSchema,
  UpdateMarketController,
  UpdateProductInCartController,
  addMarketRequestSchema,
  addProductToCartRequestSchema,
  getMarketByIdRequestSchema,
  getMarketListRequestSchema,
  getShoppingEventByIdRequestSchema,
  getShoppingEventListRequestSchema,
  removeProductFromCartRequestSchema,
  updateMarketRequestSchema,
  updateProductInCartRequestSchema,
} from '@/api';
import {
  DbAddMarket,
  DbAddProductToCart,
  DbEndShoppingEvent,
  DbGetMarketById,
  DbGetMarketList,
  DbGetShoppingEventById,
  DbGetShoppingEventList,
  DbGetUser,
  DbRemoveProductFromCart,
  DbStartShoppingEvent,
  DbUpdateMarket,
} from '@/application';
import {
  FamilyRepositories,
  MarketRepositories,
  ProductRepositories,
  ShoppingEventRepositories,
  UserRepositories,
} from '@/application/contracts';
import { DbUpdateProductInCart } from '@/application/usecases/db-update-product-in-cart';
import {
  AddMarket,
  AddProductToCart,
  EndShoppingEvent,
  GetMarketById,
  GetMarketList,
  GetShoppingEventById,
  GetShoppingEventList,
  GetUser,
  RemoveProductFromCart,
  StartShoppingEvent,
  UpdateMarket,
  UpdateProductInCart,
} from '@/domain';
import {
  PrismaFamilyRepository,
  PrismaMarketRepository,
  PrismaProductRepository,
  PrismaShoppingEventRepository,
  PrismaUserRepository,
} from '@/infrastructure';

const { infra, usecases, controllers } = injection;
// Infra
container.register<MarketRepositories>(infra.marketRepositories, PrismaMarketRepository);
container.register<UserRepositories>(infra.userRepositories, PrismaUserRepository);
container.register<FamilyRepositories>(infra.familyRepositories, PrismaFamilyRepository);
container.register<ShoppingEventRepositories>(
  infra.shoppingEventRepositories,
  PrismaShoppingEventRepository,
);
container.register<ProductRepositories>(infra.productRepositories, PrismaProductRepository);

// Usecases
container.register<AddMarket>(usecases.newMarket, DbAddMarket);
container.register<UpdateMarket>(usecases.updateMarket, DbUpdateMarket);
container.register<GetMarketList>(usecases.getMarketList, DbGetMarketList);
container.register<GetMarketById>(usecases.getMarketById, DbGetMarketById);
container.register<StartShoppingEvent>(usecases.startShoppingEvent, DbStartShoppingEvent);
container.register<EndShoppingEvent>(usecases.endShoppingEvent, DbEndShoppingEvent);
container.register<GetShoppingEventList>(usecases.getShoppingEventList, DbGetShoppingEventList);
container.register<GetShoppingEventById>(usecases.getShoppingEventById, DbGetShoppingEventById);
container.register<AddProductToCart>(usecases.addProductToCart, DbAddProductToCart);
container.register<UpdateProductInCart>(usecases.updateProductInCart, DbUpdateProductInCart);
container.register<RemoveProductFromCart>(usecases.removeProductFromCart, DbRemoveProductFromCart);
container.register<GetUser>(usecases.getUser, DbGetUser);

// Api
container.register<Controller>(controllers.newMarket, {
  useValue: new AuthorizationControllerDecorator(
    new ErrorHandlingControllerDecorator(
      new ValidationControllerDecorator(
        new AddMarketController(container.resolve(usecases.newMarket)),
        addMarketRequestSchema,
      ),
    ),
    container.resolve(usecases.getUser),
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
    container.resolve(usecases.getUser),
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
    container.resolve(usecases.getUser),
  ),
});

container.register<Controller>(controllers.getMarketById, {
  useValue: new AuthorizationControllerDecorator(
    new ErrorHandlingControllerDecorator(
      new ValidationControllerDecorator(
        new GetMarketByIdController(container.resolve(usecases.getMarketById)),
        getMarketByIdRequestSchema,
      ),
    ),
    container.resolve(usecases.getUser),
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
    container.resolve(usecases.getUser),
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
    container.resolve(usecases.getUser),
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
    container.resolve(usecases.getUser),
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
    container.resolve(usecases.getUser),
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
    container.resolve(usecases.getUser),
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
    container.resolve(usecases.getUser),
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
    container.resolve(usecases.getUser),
  ),
});
