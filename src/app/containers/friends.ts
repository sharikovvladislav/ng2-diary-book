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
  selector: 'friends-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <common-show-if-logged-in>
      <button md-button>+ Add friend</button>
      <md-tab-group>
        <md-tab>
          <ng-template md-tab-label>
            Friends list
          </ng-template>
          <friends-list [friends]="friends"></friends-list>
        </md-tab>
        <md-tab>
          <ng-template md-tab-label>
            Friend invites
          </ng-template>
          <friends-pending-container></friends-pending-container>
        </md-tab>
      </md-tab-group>
    </common-show-if-logged-in>
  `
})
export class FriendsComponent {
  friends: Friend[] = [
    {
      name: '123',
      email: '1234'
    },
    {
      name: '123456',
      email: '123456'
    },
    {
      name: '456789',
      email: '456789'
    },
  ];

  constructor() {
  }
}
