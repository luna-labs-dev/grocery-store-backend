import { container } from 'tsyringe';

import {} from '../decorators';

import { injection } from './injection-codes';

import {
  AddFamillyController,
  AddMarketController,
  AddProductToCartController,
  Controller,
  EndShoppingEventController,
  GetMarketByIdController,
  GetMarketListController,
  GetShoppingEventByIdController,
  GetShoppingEventListController,
  JoinFamilyController,
  LeaveFamilyController,
  RemoveProductFromCartController,
  StartShoppingEventController,
  UpdateMarketController,
  UpdateProductInCartController,
} from '@/api';
import {
  DbAddFamily,
  DbAddMarket,
  DbAddProductToCart,
  DbEndShoppingEvent,
  DbGetMarketById,
  DbGetMarketList,
  DbGetShoppingEventById,
  DbGetShoppingEventList,
  DbGetUser,
  DbJoinFamily,
  DbLeaveFamily,
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
import { DbUpdateProductInCart } from '@/application/usecases/shopping-event/cart/db-update-product-in-cart';
import {
  AddFamily,
  AddMarket,
  AddProductToCart,
  EndShoppingEvent,
  GetMarketById,
  GetMarketList,
  GetShoppingEventById,
  GetShoppingEventList,
  GetUser,
  JoinFamily,
  LeaveFamily,
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
container.register<AddFamily>(usecases.addFamily, DbAddFamily);
container.register<JoinFamily>(usecases.joinFamily, DbJoinFamily);
container.register<LeaveFamily>(usecases.leaveFamily, DbLeaveFamily);

// Api
container.register<Controller>(controllers.newMarket, AddMarketController);
container.register<Controller>(controllers.updateMarket, UpdateMarketController);
container.register<Controller>(controllers.getMarketList, GetMarketListController);
container.register<Controller>(controllers.getMarketById, GetMarketByIdController);
container.register<Controller>(controllers.startShoppingEvent, StartShoppingEventController);
container.register<Controller>(controllers.endShoppingEvent, EndShoppingEventController);
container.register<Controller>(controllers.getShoppingEventList, GetShoppingEventListController);
container.register<Controller>(controllers.getShoppingEventById, GetShoppingEventByIdController);
container.register<Controller>(controllers.addProductToCart, AddProductToCartController);
container.register<Controller>(controllers.updateProductInCart, UpdateProductInCartController);
container.register<Controller>(controllers.removeProductFromCart, RemoveProductFromCartController);
container.register<Controller>(controllers.addFamily, AddFamillyController);
container.register<Controller>(controllers.joinFamily, JoinFamilyController);
container.register<Controller>(controllers.leaveFamily, LeaveFamilyController);
