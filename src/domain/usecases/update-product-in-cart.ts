import { Either } from '../core';
import { Product } from '../entities';

import { ProductNotFoundError, UnexpectedError } from './errors';

export type UpdateProductInCartErrors = UnexpectedError & ProductNotFoundError;

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
