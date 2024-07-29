import { UserInfo, UserInfoResult } from '@/application';
import { firebaseApp } from '@/main/firebase/client';

export class FirebaseUserInfo implements UserInfo {
  async getInfoByUserId(userId: string): Promise<UserInfoResult> {
    const user = await firebaseApp.auth().getUser(userId);

    return {
      id: user.uid,
      name: user.displayName,
      email: user.email,
      picture: user.photoURL,
    };
  }
}
