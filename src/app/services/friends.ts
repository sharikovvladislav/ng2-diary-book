import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FriendsService {
  private API_EVENTS_PATH = '/events/friendship';
  private API_GETTER_PATH = '/friendship';

  sendInvite(possibleFriendEmail: string,
             userData: User) {
    console.log(userData, possibleFriendEmail);

    return new Observable(observer => {
      this.getDbRef()
        .push({
          action: 'CREATE_FRIENDSHIP',
          status: 'PENDING', // must be moved to backend functions (server-side logic)
          from: userData.email,
          to: possibleFriendEmail
        })
        .then(() => {
          observer.next();
          observer.complete();
        });
    });
  }

  getPendingInvites(currentUserEmail: string) {
    return this.getDbRef({
      query: {
        orderByChild: 'to',
        equalTo: currentUserEmail
      }
    })
      .map((res) => {
        return res.filter((invite: any) => invite.status === 'PENDING') || [];
      })
      .take(1);
  }

  getOutcomePendingInvites(currentUserEmail: string) {
    return this.getDbRef({
      query: {
        orderByChild: 'from',
        equalTo: currentUserEmail
      }
    })
      .map((res) => {
        return res.filter((invite: any) => invite.status === 'PENDING') || [];
      })
      .take(1);
  }

  getRejectedInvites(currentUserEmail: string): Observable<any> {
    return this.getDbRef({
      query: {
        orderByChild: 'to',
        equalTo: currentUserEmail
      }
    })
      .map((res) => {
        return res.filter((invite: any) => invite.status === 'REJECTED') || [];
      })
      .take(1);
  }

  getFriends(currentUserEmail: string): Observable<any> {
    return this.getDbRef({
      query: {
        orderByChild: 'to',
        equalTo: currentUserEmail
      }
    })
      .map((res) => {
        return res.filter((invite: any) => invite.status === 'ACCEPTED') || [];
      })
      .take(1);
  }

  private getDbRef(query = {}) {
    return this.db.list(`${this.API_EVENTS_PATH}`, query);
  }

  constructor(private db: AngularFireDatabase) {
  }
}
