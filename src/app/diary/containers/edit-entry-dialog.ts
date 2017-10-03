import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA } from '@angular/material';
import { DiaryEntry } from 'ng2-diary-book-shared-models';

@Component({
  selector: 'diary-edit-dialog',
  template: `
    <diary-entry-edit
      [entry]="entry"
    ></diary-entry-edit>
  `,
})
export class EntryEditDialogComponent {
  entry: DiaryEntry;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.entry = data;
  }
}
