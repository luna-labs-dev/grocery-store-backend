import { Entity } from '../core';

export interface MarketProps {
  name: string;
  createdAt: Date;
  createdBy: string;
}

export class Market extends Entity<MarketProps> {
  private constructor(props: MarketProps, id?: string) {
    super(props, id);
  }

  get name(): string {
    return this.props.name;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get createdBy(): string {
    return this.props.createdBy;
  }

  public static create(props: MarketProps, id?: string): Market {
    const entity = new Market(props, id);
    return entity;
  }
}
