import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../models/user';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class FriendsService {
  private API_EVENTS_PATH = '/events/friendship';
  private API_GETTER_PATH = '/friendship';
  private API_REST_URL = environment.firebase.restURL;

  sendInvite(possibleFriendEmail: string) {
    return this.http.post(`${this.API_REST_URL}friends/createFriendship`, {
      targetEmail: possibleFriendEmail
    });
  }

  acceptInvite(friendEmail: string) {
    return this.http.put(`${this.API_REST_URL}friends`, {
      targetEmail: friendEmail
    });
  }

  rejectInvite(friendEmail: string,
               userData: User) {
    // FIXME сделать
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
    // Сделать
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
    return this.http.get(`${this.API_REST_URL}pendingFriends`);
  }

  getOutcomePendingInvites() {
    return this.http.get(`${this.API_REST_URL}pendingOutcomeFriends`);
  }

  getRejectedInvites(): Observable<any> {
    return this.http.get(`${this.API_REST_URL}rejectedInvites`);
  }

  getFriends(): Observable<any> {
    return this.http.get(`${this.API_REST_URL}friends`);
  }

  try() {
    return this.http.get('https://us-central1-diary-app-1fa1b.cloudfunctions.net/app/hello');
  }

  private getEventsDbRef(query = {}) {
    return this.db.list(`${this.API_EVENTS_PATH}`, query);
  }

  private getGetterDbRef(query = {}) {
    return this.db.list(`${this.API_GETTER_PATH}`, query);
  }

  constructor(private db: AngularFireDatabase, private http: HttpClient) {
  }
}
