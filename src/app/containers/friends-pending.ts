import {Component, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromRoot from '../reducers/index';

import * as diaryEntries from '../actions/diary-entries';

import {DiaryEntry} from '../models/diary-entry';

import {MdDialog, MdDialogRef} from '@angular/material';

import { EntryCreateDialogComponent } from './create-entry-dialog';
import { EntryEditDialogComponent } from './edit-entry-dialog';
import { Friend } from '../models/friend';

@Component({
  selector: 'friends-pending-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <friends-list
      [friends]="pendingFriends"
      [isPendingMode]="true"
      (accept)="onAccept($event)"
    ></friends-list>
  `
})
export class FriendsPendingComponent {
  pendingFriends: Friend[] = [
    {
      name: 'pending-123',
      email: 'pending-1234'
    },
    {
      name: 'pending-123456',
      email: 'pending-123456'
    },
    {
      name: 'pending-456789',
      email: 'pending-456789'
    },
  ];

  constructor() {
  }

  onAccept(event: any) {
  }
}
