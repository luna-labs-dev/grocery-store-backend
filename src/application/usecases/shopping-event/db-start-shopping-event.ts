import { inject, injectable } from 'tsyringe';

import {
  AddShoppingEventRepository,
  GetFamilyByIdRepository,
  GetMarketByIdRepository,
} from '@/application/contracts';
import {
  Either,
  FamilyNotFoundError,
  MarketNotFoundError,
  ShoppingEvent,
  StartShoppingEvent,
  StartShoppingEventErrors,
  StartShoppingEventParams,
  UnexpectedError,
  UserNotAFamilyMemberError,
  left,
  right,
} from '@/domain';
import { Products } from '@/domain/entities/products';
import { injection } from '@/main/di/injection-codes';

const { infra } = injection;
@injectable()
export class DbStartShoppingEvent implements StartShoppingEvent {
  constructor(
    @inject(infra.marketRepositories)
    private readonly marketRepository: GetMarketByIdRepository,
    @inject(infra.familyRepositories)
    private readonly familyRepository: GetFamilyByIdRepository,
    @inject(infra.shoppingEventRepositories)
    private readonly shoppingEventRepository: AddShoppingEventRepository,
  ) {}

  execute = async ({
    user,
    familyId,
    marketId,
  }: StartShoppingEventParams): Promise<Either<StartShoppingEventErrors, ShoppingEvent>> => {
    try {
      // TUDO - Implement Family Repository
      // Fetch Family
      const family = await this.familyRepository.getById({ familyId });

      // If Family doesnt exists returns FamilyNotFoundError
      if (!family) {
        return left(new FamilyNotFoundError(familyId));
      }

      const member = family.members.find((member) => member.id === user);

      if (!member) {
        return left(new UserNotAFamilyMemberError());
      }

      // Calls GetMarketById
      const market = await this.marketRepository.getById({
        id: marketId,
      });

      // If Market doesnt exists returns MarketNotFoundError
      if (!market) {
        return left(new MarketNotFoundError());
      }

      // Create ShoppingEvent instance
      const shoppingEvent = ShoppingEvent.create({
        familyId,
        marketId,
        market,
        status: 'ONGOING',
        createdAt: new Date(),
        createdBy: user,
        products: Products.create([]),
      });

      // Calls AddShoppingEvent repository

      await this.shoppingEventRepository.add(shoppingEvent);

      // Returns ShoppingEvent
      return right(shoppingEvent);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  };
}
