import { AddProductRepository } from './add-product-repository';
import { UpdateProductRepository } from './update-product-repository';

export type ProductRepositories = AddProductRepository & UpdateProductRepository;

export * from './add-product-repository';
export * from './update-product-repository';
