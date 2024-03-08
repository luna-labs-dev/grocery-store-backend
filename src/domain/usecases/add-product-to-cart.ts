import { Either } from '../core';
import { Product } from '../entities';

import { ShoppingEventNotFoundError, UnexpectedError } from './errors';

export type AddProductToCartErrors = UnexpectedError & ShoppingEventNotFoundError;

export interface AddProductToCartParams {
  user: string;
  shoppingEventId: string;
  name: string;
  amount: number;
  wholesaleMinAmount?: number;
  price: number;
  wholesalePrice?: number;
}

export interface AddProductToCart {
  execute: (params: AddProductToCartParams) => Promise<Either<AddProductToCartErrors, Product>>;
}
