import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FriendsService {
  private API_EVENTS_PATH = '/events/friendship';

  sendInvite(
    possibleFriendEmail: string,
    userData: User,
  ) {
    console.log(userData, possibleFriendEmail);

    return new Observable(observer => {
      this.getDbRef()
        .push({
          action: 'CREATE_FRIENDSHIP',
          from: userData.email,
          to: possibleFriendEmail
        })
        .then(() => {
          observer.next();
          observer.complete();
        });
    });
  }

  private getDbRef() {
    return this.db.list(`${this.API_EVENTS_PATH}`);
  }

  constructor(
    private db: AngularFireDatabase,
  ) {}
}
