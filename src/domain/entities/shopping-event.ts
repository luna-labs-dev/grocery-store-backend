import { Entity, TimerHelper } from '../core';

import { Market } from './market';
import { Product } from './product';
import { Products } from './products';

export const validShoppingEventStatus = ['CANCELED', 'FINISHED', 'ONGOING'] as const;
export type ShoppingEventStatus = (typeof validShoppingEventStatus)[number];

export interface ShoppingEventProps {
  marketId: string;
  market?: Market;
  description?: string;
  totalPaid?: number;
  wholesaleTotal?: number;
  retailTotal?: number;
  status: ShoppingEventStatus;
  products: Products;
  elapsedTime?: number;
  createdAt: Date;
  finishedAt?: Date;
  createdBy: string;
}

export class ShoppingEvent extends Entity<ShoppingEventProps> {
  private constructor(props: ShoppingEventProps, id?: string) {
    super(props, id);
  }

  get marketId(): string {
    return this.props.marketId;
  }

  get market(): Market | undefined {
    return this.props.market;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get totalPaid(): number | undefined {
    return this.props.totalPaid;
  }

  get wholesaleTotal(): number | undefined {
    return this.props.wholesaleTotal;
  }

  set wholesaleTotal(wholesaleTotal: number) {
    this.props.wholesaleTotal = wholesaleTotal;
  }

  get retailTotal(): number | undefined {
    return this.props.retailTotal;
  }

  set retailTotal(retailTotal: number) {
    this.props.retailTotal = retailTotal;
  }

  get status(): ShoppingEventStatus {
    return this.props.status;
  }

  set status(status: ShoppingEventStatus) {
    this.props.status = status;
  }

  get products(): Products {
    return this.props.products;
  }

  get elapsedTime(): number | undefined {
    return this.props.elapsedTime;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get finishedAt(): Date | undefined {
    return this.props.finishedAt;
  }

  set finishedAt(finishedAt: Date) {
    this.props.finishedAt = finishedAt;
  }

  get createdBy(): string {
    return this.props.createdBy;
  }

  public static create(props: ShoppingEventProps, id?: string): ShoppingEvent {
    const entity = new ShoppingEvent(props, id);
    return entity;
  }

  end = (): ShoppingEventStatus | undefined => {
    if (this.props.status !== 'ONGOING') {
      return this.props.status;
    }

    this.props.status = 'FINISHED';
    this.props.finishedAt = new Date();
    this.props.elapsedTime = TimerHelper.calculateDuration(this.props.createdAt);
  };

  addProduct = (product: Product): void => {
    this.props.products.add(product);
    this.calculateTotals();
  };

  private calculateTotals(): void {
    const summed = {
      wholesaleTotal: 0,
      retailTotal: 0,
    };

    this.props.products.getItems().forEach((prod) => {
      summed.retailTotal += prod.amount * prod.price;

      summed.wholesaleTotal +=
        prod.wholesaleMinAmount && prod.wholesalePrice && prod.amount >= prod.wholesaleMinAmount
          ? prod.amount * prod.wholesalePrice
          : prod.amount * prod.price;
    });

    this.retailTotal = summed.retailTotal;
    this.wholesaleTotal = summed.wholesaleTotal;
  }

  public getCalculatedTotals(): object {
    this.calculateTotals();

    const wholesaleSavingValue =
      !!this.retailTotal && !!this.wholesaleTotal ? this.retailTotal - this.wholesaleTotal : 0;

    const retailPaidDifferenceValue =
      !!this.retailTotal && !!this.totalPaid ? this.retailTotal - this.totalPaid : 0;

    const wholesalePaidDifferenceValue =
      !!this.wholesaleTotal && !!this.totalPaid ? this.wholesaleTotal - this.totalPaid : 0;

    return {
      retailTotal: this.retailTotal,
      wholesaleTotal: this.wholesaleTotal,
      paidValue: this.totalPaid,
      wholesaleSavingValue,
      retailPaidDifferenceValue,
      wholesalePaidDifferenceValue,
    };
  }
}
