import { Entity } from '../core';

import { User } from './user';

interface FamilyProps {
  ownerId: string;
  owner: User;
  name: string;
  description?: string;
  inviteCode?: string;
  users: User[];
}

export class Family extends Entity<FamilyProps> {
  private constructor(props: FamilyProps, id?: string) {
    super(props, id);
  }

  public get ownerId(): string {
    return this.props.ownerId;
  }

  public get owner(): User {
    return this.props.owner;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string | undefined {
    return this.props.description;
  }

  public get inviteCode(): string | undefined {
    return this.props.inviteCode;
  }

  public get members(): User[] {
    return this.props.users;
  }

  public static create(props: FamilyProps, id?: string): Family {
    return new Family(props, id);
  }
}
