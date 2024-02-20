import { inject, injectable } from 'tsyringe';

import { GetMarketByIdRepository } from '../contracts';

import {
  Either,
  left,
  Market,
  UnexpectedError,
  UpdateMarket,
  UpdateMarketErrors,
  UpdateMarketParams,
} from '@/domain';
import { injection } from '@/main/di/injection-codes';

export type UpdateMarketRepositories = GetMarketByIdRepository;

const { infra } = injection;
@injectable()
export class DbUpdateMarket implements UpdateMarket {
  constructor(
    @inject(infra.marketRepositories) private readonly repositories: UpdateMarketRepositories,
  ) {}

  execute = async ({
    name,
    marketId,
  }: UpdateMarketParams): Promise<Either<UpdateMarketErrors, Market>> => {
    // GetMarketById
    await this.repositories.getById({ id: marketId });

    // Return Market not found if No market is returned

    // Update Market Entity with new values

    // Update Market in the Database

    // Return Updated Market
    return left(new UnexpectedError());
  };
}
