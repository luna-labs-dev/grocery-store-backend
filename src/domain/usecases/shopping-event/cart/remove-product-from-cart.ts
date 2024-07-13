import { Either } from '../../../core';

import { ProductNotFoundError, ShoppingEventNotFoundError, UnexpectedError } from '../../errors';

export interface RemoveProductFromCartParams {
  familyId: string;
  shoppingEventId: string;
  productId: string;
}

export type RemoveProductFromCartErrors = UnexpectedError &
  ShoppingEventNotFoundError &
  ProductNotFoundError;

export interface RemoveProductFromCart {
  execute: (
    params: RemoveProductFromCartParams,
  ) => Promise<Either<RemoveProductFromCartErrors, void>>;
}
