import { GetShoppingEventListRepository } from '../contracts';

import {
  Either,
  GetShoppingEventList,
  GetShoppingEventListParams,
  GetShoppingEventListPossibleErrors,
  GetShoppingEventListResult,
  left,
  UnexpectedError,
} from '@/domain';

export class DbGetShoppingEventList implements GetShoppingEventList {
  constructor(private readonly repository: GetShoppingEventListRepository) {}
  execute = async (
    params: GetShoppingEventListParams,
  ): Promise<Either<GetShoppingEventListPossibleErrors, GetShoppingEventListResult>> => {
    // Get the ShoppingEvent List count based on the filters

    // Create the return object with the count and an empty array

    // IF count is greater than 0 fetch the actual list based on the same filter

    // Assign the returned list in the shoppingList array inside the return object

    // Return the object
    return left(new UnexpectedError());
  };
}
