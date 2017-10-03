import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsViewerComponent } from './tags-viewer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TagsViewerComponent],
  exports: [TagsViewerComponent],
})
export class TagsViewerModule {}
