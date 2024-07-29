import { Entity } from '../core';

import { Family } from './family';

interface UserProps {
  firebaseId: string;
  email: string;
  name?: string;
  picture?: string;
  familyId?: string;
  family?: Family;
}

interface UserInfoProps {
  name: string;
  picture?: string;
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

  public get displayName(): string | undefined {
    return this.props.name;
  }

  public get picture(): string | undefined {
    return this.props.picture;
  }

  public set picture(picture: string | undefined) {
    this.props.picture = picture;
  }

  public get familyId(): string | undefined {
    return this.props.familyId;
  }

  public set familyId(familyId: string | undefined) {
    this.props.familyId = familyId;
  }

  public get family(): Family | undefined {
    return this.props.family;
  }

  public setUserInfo({ name, picture }: UserInfoProps) {
    this.props.name = name;
    this.props.picture = picture;
  }

  public static create(props: UserProps, id?: string): User {
    return new User(props, id);
  }
}
