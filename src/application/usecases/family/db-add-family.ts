import { AddFamilyRepository, GetUserByIdRepository } from '@/application/contracts';
import {
  AddFamily,
  AddFamilyErrors,
  AddFamilyParams,
  Either,
  Family,
  UnexpectedError,
  UserNotFoundError,
  left,
  right,
} from '@/domain';
import { injection } from '@/main/di';
import { inject, injectable } from 'tsyringe';

const { infra } = injection;
@injectable()
export class DbAddFamily implements AddFamily {
  constructor(
    @inject(infra.userRepositories) private readonly userRepository: GetUserByIdRepository,
    @inject(infra.familyRepositories) private readonly familyRepository: AddFamilyRepository,
  ) {}

  async execute({
    userId,
    name,
    description,
  }: AddFamilyParams): Promise<Either<AddFamilyErrors, Family>> {
    try {
      // Fetch user
      const user = await this.userRepository.getByExternalId(userId);

      if (!user) {
        return left(new UserNotFoundError());
      }

      // Create Family entity
      const family = Family.create({
        name: name,
        ownerId: user.id,
        owner: user,
        createdAt: new Date(),
        createdBy: user.id,
      });

      // Save Family to database
      await this.familyRepository.add(family);

      // Return Family entity
      return right(family);
    } catch (error) {
      console.error(error);

      return left(new UnexpectedError());
    }
  }
}
