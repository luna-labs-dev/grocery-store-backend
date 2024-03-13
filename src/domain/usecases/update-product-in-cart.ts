import { Either } from '../core';
import { Product } from '../entities';

import { ProductNotFoundError, ShoppingEventNotFoundError, UnexpectedError } from './errors';

export type UpdateProductInCartErrors = UnexpectedError &
  ShoppingEventNotFoundError &
  ProductNotFoundError;

export interface UpdateProductInCartParams {
  shoppingEventId: string;
  productId: string;
  name: string;
  amount: number;
  wholesaleMinAmount?: number;
  price: number;
  wholesalePrice?: number;
}

export interface UpdateProductInCart {
  execute: (
    params: UpdateProductInCartParams,
  ) => Promise<Either<UpdateProductInCartErrors, Product>>;
}
