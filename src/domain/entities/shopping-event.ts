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
  totalItemsDistinct?: number;
  totalItemsQuantity?: number;
  averagePricePerUnit?: number;
  highestPrice?: number;
  lowestPrice?: number;
  savingsPercentage?: number;
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

  get totalItemsDistinct(): number | undefined {
    return this.props.totalItemsDistinct;
  }

  get totalItemsQuantity(): number | undefined {
    return this.props.totalItemsQuantity;
  }

  get averagePricePerUnit(): number | undefined {
    return this.props.averagePricePerUnit;
  }

  get highestPrice(): number | undefined {
    return this.props.highestPrice;
  }

  get lowestPrice(): number | undefined {
    return this.props.lowestPrice;
  }

  get savingsPercentage(): number | undefined {
    return this.props.savingsPercentage;
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

  removeProduct = (product: Product) => {
    this.props.products.remove(product);
    this.calculateTotals();
  };

  private calculateTotals(): void {
    const summed = {
      wholesaleTotal: 0,
      retailTotal: 0,
      totalItemsQuantity: 0,
      highestPrice: 0,
      lowestPrice: Number.MAX_VALUE,
    };

    const items = this.props.products.getItems();
    const totalItemsDistinct = items.length;

    for (const product of items) {
      const calculatedTotal = product.getCalculatedTotals();
      summed.retailTotal += calculatedTotal.totalsRetailOnly;
      summed.wholesaleTotal += calculatedTotal.totalsWithWhosale;
      summed.totalItemsQuantity += product.amount;

      if (product.price > summed.highestPrice) summed.highestPrice = product.price;
      if (product.price < summed.lowestPrice) summed.lowestPrice = product.price;
    }

    this.props.retailTotal = summed.retailTotal;
    this.props.wholesaleTotal = summed.wholesaleTotal;
    this.props.totalItemsDistinct = totalItemsDistinct;
    this.props.totalItemsQuantity = summed.totalItemsQuantity;
    this.props.highestPrice = summed.highestPrice;
    this.props.lowestPrice = totalItemsDistinct > 0 ? summed.lowestPrice : 0;

    // Savings percentage
    if (this.props.retailTotal && this.props.retailTotal > 0) {
      const savings = this.props.retailTotal - (this.props.wholesaleTotal ?? 0);
      this.props.savingsPercentage = (savings / this.props.retailTotal) * 100;
    } else {
      this.props.savingsPercentage = 0;
    }

    // Average price per unit
    const paidValue = this.props.totalPaid ?? this.props.wholesaleTotal;
    if (this.props.totalItemsQuantity && this.props.totalItemsQuantity > 0) {
      this.props.averagePricePerUnit = (paidValue ?? 0) / this.props.totalItemsQuantity;
    } else {
      this.props.averagePricePerUnit = 0;
    }
  }

  public getCalculatedTotals() {
    this.calculateTotals();
    const totals: any = {
      retailTotal: this.retailTotal,
      wholesaleTotal: this.wholesaleTotal,
      paidValue: this.totalPaid,
      wholesaleSavingValue: 0,
      retailPaidDifferenceValue: undefined,
      wholesalePaidDifferenceValue: undefined,
      totalItemsDistinct: this.props.totalItemsDistinct,
      totalItemsQuantity: this.props.totalItemsQuantity,
      averagePricePerUnit: this.props.averagePricePerUnit,
      highestPrice: this.props.highestPrice,
      lowestPrice: this.props.lowestPrice,
      savingsPercentage: this.props.savingsPercentage,
    };

    if (this.retailTotal !== undefined && this.wholesaleTotal !== undefined) {
      const retailTotalInCents = monetaryCalc.toCents(this.retailTotal);
      const wholesaleTotalInCents = monetaryCalc.toCents(this.wholesaleTotal);

      totals.wholesaleSavingValue = monetaryCalc.toReais(
        retailTotalInCents - wholesaleTotalInCents,
      );
    }

    if (this.totalPaid !== undefined) {
      if (this.retailTotal !== undefined) {
        const retailTotalInCents = monetaryCalc.toCents(this.retailTotal);
        const totalPaidInCents = monetaryCalc.toCents(this.totalPaid);

        totals.retailPaidDifferenceValue = monetaryCalc.toReais(
          totalPaidInCents - retailTotalInCents,
        );
      } else {
        totals.retailPaidDifferenceValue = 0;
      }

      if (this.wholesaleTotal !== undefined) {
        const wholeSaleInCents = monetaryCalc.toCents(this.wholesaleTotal);
        const totalPaidInCents = monetaryCalc.toCents(this.totalPaid);

        totals.wholesalePaidDifferenceValue = monetaryCalc.toReais(
          totalPaidInCents - wholeSaleInCents,
        );
      } else {
        totals.wholesalePaidDifferenceValue = 0;
      }
    }

    return totals;
  }

  public toSummaryDto() {
    const totals = this.getCalculatedTotals();
    return {
      id: this.id,
      status: this.status,
      market: this.market
        ? {
            id: this.marketId,
            code: this.market.code,
            name: this.market.name,
            createdAt: this.market.createdAt,
          }
        : {
            id: this.marketId,
          },
      calculatedTotals: totals,
      products: this.products.getItems().map((prod) => {
        const { totalsRetailOnly, totalsWithWhosale, totalsDifference } =
          prod.getCalculatedTotals();
        return {
          id: prod.id,
          name: prod.name,
          amount: prod.amount,
          wholesaleMinAmount: prod.wholesaleMinAmount,
          price: prod.price,
          wholesalePrice: prod.wholesalePrice,
          totalRetailPrice: totalsRetailOnly,
          totalWholesalePrice: totalsWithWhosale,
          totalDifference: totalsDifference,
          addedAt: prod.addedAt,
        };
      }),
      elapsedTime: this.elapsedTime,
      createdAt: this.createdAt,
      finishedAt: this.finishedAt,
      createdBy: this.createdBy,
    };
  }
}
