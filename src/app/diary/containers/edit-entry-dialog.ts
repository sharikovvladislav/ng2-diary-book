import {Component, Inject} from '@angular/core';
import {MdDialog, MdDialogRef} from '@angular/material';
import {MD_DIALOG_DATA} from '@angular/material';
import {DiaryEntry} from '../../shared/models/diary-entry';

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

  constructor(
    public dialogRef: MdDialogRef<EntryEditDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any
  ) {
    this.entry = data;
  }
}
