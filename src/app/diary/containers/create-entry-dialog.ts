import { Component } from '@angular/core';
import {

  MdDialogRef } from '@angular/material';

@Component({
  selector: 'diary-create-dialog',
  template: `
    <diary-entry-create></diary-entry-create>
  `,
})
export class EntryCreateDialogComponent {
  constructor() {}
}
