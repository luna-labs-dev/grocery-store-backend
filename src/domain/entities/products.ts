import { WatchedList } from '../core';

import { Product } from './product';

export class Products extends WatchedList<Product> {
  compareItems(a: Product, b: Product): boolean {
    return a.id === b.id;
  }

  compareProps(a: Product, b: Product): boolean {
    throw new Error('Method not implemented.');
  }

  private constructor(products: Product[]) {
    super(products);
  }

  public static create(products?: Product[]): Products {
    return new Products(products ?? []);
  }
}
