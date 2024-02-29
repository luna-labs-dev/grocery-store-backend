import { Entity } from '../core';

import { Market } from './market';

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

  get retailTotal(): number | undefined {
    return this.props.retailTotal;
  }

  get status(): ShoppingEventStatus {
    return this.props.status;
  }

  set status(status: ShoppingEventStatus) {
    this.props.status = status;
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

  end = (): void => {
    this.props.status = 'FINISHED';
    this.props.finishedAt = new Date();
  };
}
