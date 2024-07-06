import { Entity } from '../core';

import { Family } from './family';

interface UserProps {
  firebaseId: string;
  email: string;
  displayName: string;
  familyId?: string;
  family?: Family;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  public get firebaseId(): string {
    return this.props.firebaseId;
  }

  public get email(): string {
    return this.props.email;
  }

  public get displayName(): string {
    return this.props.displayName;
  }

  public get familyId(): string | undefined {
    return this.props.familyId;
  }

  public get family(): Family | undefined {
    return this.props.family;
  }

  public static create(props: UserProps, id?: string): User {
    return new User(props, id);
  }
}
