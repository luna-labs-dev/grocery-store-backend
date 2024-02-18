import { Entity } from '../core';

import { ShoppingEvent } from './shopping-event';

export interface ProductProps {
  shoppingEventId: string;
  shoppingEvent?: ShoppingEvent;
  name: string;
  amount: number;
  wholesaleMinAmount?: number;
  price: number;
  wholesalePrice: number;
  addedAt: Date;
  addedBy: string;
}

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: string) {
    super(props, id);
  }

  get shoppingEventId(): string {
    return this.props.shoppingEventId;
  }

  get shoppingEvent(): ShoppingEvent | undefined {
    return this.props.shoppingEvent;
  }

  get name(): string {
    return this.props.name;
  }

  get amount(): number {
    return this.props.amount;
  }

  get wholesaleMinAmount(): number | undefined {
    return this.props.wholesaleMinAmount;
  }

  get price(): number {
    return this.props.price;
  }

  get wholesalePrice(): number | undefined {
    return this.props.wholesalePrice;
  }

  get addedAt(): Date {
    return this.props.addedAt;
  }

  get addedBy(): string {
    return this.props.addedBy;
  }

  public static create(props: ProductProps, id?: string): Product {
    const entity = new Product(props, id);
    return entity;
  }
}
