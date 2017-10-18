import { NgModule } from '@angular/core';
import { TestComponent } from './test.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [RouterModule],
  declarations: [TestComponent],
  exports: [TestComponent],
})
export class TestModule {}
