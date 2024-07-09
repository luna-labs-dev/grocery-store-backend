import { AddFamilyRepository } from './add-family-repository';
import { GetFamilyByIdRepository } from './get-family-by-id';
import { GetFamilyByInviteCodeRepository } from './get-family-by-invite-code-repository';
import { UpdateFamilyRepository } from './update-family-repository';

export type FamilyRepositories = AddFamilyRepository &
  GetFamilyByIdRepository &
  GetFamilyByInviteCodeRepository &
  UpdateFamilyRepository;

export * from './add-family-repository';
export * from './get-family-by-id';
export * from './update-family-repository';
export * from './get-family-by-invite-code-repository';
