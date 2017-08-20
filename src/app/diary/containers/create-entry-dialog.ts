import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

@Component({
  selector: 'diary-create-dialog',
  template: `
    <diary-entry-create></diary-entry-create>
  `,
})
export class EntryCreateDialogComponent {
  selectedOption: string;

  constructor(public dialogRef: MdDialogRef<EntryCreateDialogComponent>) {}
}
