import { AddUserRepository } from './add-user-repository';
import { GetUserByIdRepository } from './get-user-by-id-repository';
import { UpdateUserRepository } from './update-user-repository';

export type UserRepositories = AddUserRepository & UpdateUserRepository & GetUserByIdRepository;

export * from './add-user-repository';
export * from './update-user-repository';
export * from './get-user-by-id-repository';
