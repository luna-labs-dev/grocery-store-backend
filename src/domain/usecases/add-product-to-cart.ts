import { Either } from '../core';
import { Product } from '../entities';

import { UnexpectedError } from './errors';

export type AddProductToCartErrors = UnexpectedError;

export interface AddProductToCartParams {
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
