import { AddProductRepository } from './add-product-repository';
import { RemoveProductRepository } from './remove-product-repository';
import { UpdateProductRepository } from './update-product-repository';

export * from './add-product-repository';
export * from './update-product-repository';
export * from './remove-product-repository';

export type ProductRepositories = AddProductRepository &
  UpdateProductRepository &
  RemoveProductRepository;
