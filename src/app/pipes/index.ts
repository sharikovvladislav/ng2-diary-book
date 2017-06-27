import { NgModule } from '@angular/core';

import { AddCommasPipe } from './add-commas';
import { EllipsisPipe } from './ellipsis';
import { MarkdownPipe } from './markdown';


export const PIPES = [
  AddCommasPipe,
  EllipsisPipe,
  MarkdownPipe,
];

@NgModule({
  declarations: PIPES,
  exports: PIPES
})
export class PipesModule { }
