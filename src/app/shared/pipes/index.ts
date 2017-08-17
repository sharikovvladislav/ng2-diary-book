import { NgModule } from '@angular/core';

import { MarkdownPipe } from './markdown';

export const PIPES = [MarkdownPipe];

@NgModule({
  declarations: PIPES,
  exports: PIPES,
})
export class PipesModule {}

