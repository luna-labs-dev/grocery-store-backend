import { AddFamilyRepository } from './add-family-repository';
import { GetFamilyByIdRepository } from './get-family-by-id';
import { UpdateFamilyRepository } from './update-family-repository';

export type FamilyRepositories = AddFamilyRepository &
  GetFamilyByIdRepository &
  UpdateFamilyRepository;

export * from './add-family-repository';
export * from './get-family-by-id';
export * from './update-family-repository';
