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
    return new Observable(observer => {
      this.getEventsDbRef()
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

  acceptInvite(friendEmail: string,
               userData: User) {
    return new Observable(observer => {
      this.getEventsDbRef()
        .push({
          action: 'ACCEPT_FRIENDSHIP',
          friend_one: friendEmail,
          friend_two: userData.email
        })
        .then(() => {
          observer.next();
          observer.complete();
        });
    });
  }

  rejectInvite(friendEmail: string,
               userData: User) {
    return new Observable(observer => {
      this.getEventsDbRef()
        .push({
          action: 'REJECT_FRIENDSHIP',
          friend_one: friendEmail,
          friend_two: userData.email
        })
        .then(() => {
          observer.next();
          observer.complete();
        });
    });
  }

  stopFriendship(friendEmail: string,
               userData: User) {
    return new Observable(observer => {
      this.getEventsDbRef()
        .push({
          action: 'STOP_FRIENDSHIP',
          friend_one: friendEmail,
          friend_two: userData.email
        })
        .then(() => {
          observer.next();
          observer.complete();
        });
    });
  }

  getPendingInvites(currentUserEmail: string) {
    return this.getGetterDbRef({
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
    return this.getGetterDbRef({
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
    return this.getGetterDbRef({
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
    return this.getGetterDbRef({
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

  private getEventsDbRef(query = {}) {
    return this.db.list(`${this.API_EVENTS_PATH}`, query);
  }

  private getGetterDbRef(query = {}) {
    return this.db.list(`${this.API_GETTER_PATH}`, query);
  }

  constructor(private db: AngularFireDatabase) {
  }
}
