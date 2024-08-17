import { Entity, TimerHelper } from '../core';
import { monetaryCalc } from '../helper';

import { Family } from './family';
import { Market } from './market';
import { Product } from './product';
import { Products } from './products';

export const validShoppingEventStatus = ['CANCELED', 'FINISHED', 'ONGOING'] as const;
export type ShoppingEventStatus = (typeof validShoppingEventStatus)[number];

export interface ShoppingEventProps {
  familyId: string;
  family?: Family;
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

  get familyId(): string {
    return this.props.familyId;
  }

  get family(): Family | undefined {
    return this.props.family;
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

  set totalPaid(totalPaid: number) {
    this.props.totalPaid = totalPaid;
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

  end = (totalPaid: number): void => {
    this.props.totalPaid = totalPaid;
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

    for (const product of this.props.products.getItems()) {
      summed.retailTotal += product.amount * product.price;

      summed.wholesaleTotal +=
        product.wholesaleMinAmount &&
        product.wholesalePrice &&
        product.amount >= product.wholesaleMinAmount
          ? product.amount * product.wholesalePrice
          : product.amount * product.price;
    }

    this.retailTotal = summed.retailTotal;
    this.wholesaleTotal = summed.wholesaleTotal;
  }

  public getCalculatedTotals(): object {
    this.calculateTotals();
    const totals = {
      retailTotal: this.retailTotal,
      wholesaleTotal: this.wholesaleTotal,
      paidValue: this.totalPaid,
      wholesaleSavingValue: 0,
      retailPaidDifferenceValue: 0,
      wholesalePaidDifferenceValue: 0,
    };

    if (!!this.retailTotal && !!this.wholesaleTotal) {
      const retailTotalInCents = monetaryCalc.toCents(this.retailTotal);
      const wholesaleTotalInCents = monetaryCalc.toCents(this.wholesaleTotal);

      totals.wholesaleSavingValue = monetaryCalc.toReais(
        retailTotalInCents - wholesaleTotalInCents,
      );
    }

    if (!!this.retailTotal && !!this.totalPaid) {
      const retailTotalInCents = monetaryCalc.toCents(this.retailTotal);
      const totalPaidInCents = monetaryCalc.toCents(this.totalPaid);

      totals.retailPaidDifferenceValue = monetaryCalc.toReais(
        retailTotalInCents - totalPaidInCents,
      );
    }

    if (!!this.wholesaleTotal && !!this.totalPaid) {
      const wholeSaleInCents = monetaryCalc.toCents(this.wholesaleTotal);
      const totalPaidInCents = monetaryCalc.toCents(this.totalPaid);

      totals.wholesalePaidDifferenceValue = monetaryCalc.toReais(
        wholeSaleInCents - totalPaidInCents,
      );
    }

    return totals;
  }
}
