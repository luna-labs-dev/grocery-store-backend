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
    return left(new UnexpectedError());
  };
}
