import { GetShoppingEventListRepository } from '../contracts';

import {
  Either,
  GetShoppingEventList,
  GetShoppingEventListParams,
  GetShoppingEventListPossibleErrors,
  GetShoppingEventListResult,
  left,
  right,
  UnexpectedError,
} from '@/domain';

export class DbGetShoppingEventList implements GetShoppingEventList {
  constructor(private readonly repository: GetShoppingEventListRepository) {}
  execute = async ({
    status,
    period,
    pageIndex,
    pageSize,
    orderBy,
    orderDirection,
  }: GetShoppingEventListParams): Promise<
    Either<GetShoppingEventListPossibleErrors, GetShoppingEventListResult>
  > => {
    try {
      // Get the ShoppingEvent List count based on the filters
      const shoppingEventListCount = await this.repository.count({ status, period });

      // Create the return object with the count and an empty array
      const response: GetShoppingEventListResult = {
        total: shoppingEventListCount,
        shoppingEvents: [],
      };

      // IF count is greater than 0 fetch the actual list based on the same filter
      if (shoppingEventListCount > 0) {
        const shoppingEventList = await this.repository.getAll({
          status,
          period,
          pageIndex,
          pageSize,
          orderBy,
          orderDirection,
        });

        // Assign the returned list in the shoppingList array inside the return object
        response.shoppingEvents = shoppingEventList;
      }

      // Return the object
      return right(response);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
