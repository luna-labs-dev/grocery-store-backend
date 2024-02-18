import { Entity } from '../core';
import { nameToCode } from '../helper';

export interface MarketProps {
  code?: string;
  name: string;
  createdAt: Date;
  createdBy: string;
}

export class Market extends Entity<MarketProps> {
  private constructor(props: MarketProps, id?: string) {
    super(props, id);
  }

  get code(): string | undefined {
    return this.props.code;
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
    if (!props.code) {
      props.code = nameToCode(props.name);
    }

    return new Market(props, id);
  }
}
