import { Injectable } from '@angular/core';
import { EntryCreateDialogComponent } from '../containers/create-entry-dialog';
import { MdDialog } from '@angular/material';
import { EntryEditDialogComponent } from '../containers/edit-entry-dialog';

@Injectable()
export class DialogFactoryService {
  editEntryDialog: any = null;
  createEntryDialog: any = null;

  constructor(private dialog: MdDialog) {}

  openCreateEntryDialog(): void {
    this.editEntryDialog = this.dialog.open(EntryCreateDialogComponent, {
      disableClose: true,
    });
  }

  closeCreateEntryDialog(): void {
    this.editEntryDialog.close();
  }

  openEditEntryDialog(dialogData: any): void {
    this.createEntryDialog = this.dialog.open(EntryEditDialogComponent, {
      data: dialogData,
      disableClose: true,
    });
  }

  closeEditEntryDialog(): void {
    this.createEntryDialog.close();
  }
}
