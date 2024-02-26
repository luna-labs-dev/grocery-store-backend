import { AddShoppingEventRepository } from './add-shopping-event-repository';
import { UpdateShoppingEventRepository } from './update-shopping-event-repository';

export type ShoppingEventRepositories = AddShoppingEventRepository & UpdateShoppingEventRepository;

export * from './add-shopping-event-repository';
export * from './update-shopping-event-repository';
