import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'friends-add-dialog',
  template: `
    <friends-add></friends-add>
  `,
})
export class AddFriendDialogComponent {
  constructor(public dialogRef: MdDialogRef<AddFriendDialogComponent>) {
  }
}
