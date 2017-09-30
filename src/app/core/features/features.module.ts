import { NgModule } from '@angular/core';
import { TagsAutoCompleteModule } from './components/tags-autocomplete/tags-autocomplete.module';
import { TagsAutoCompleteExampleComponent } from './components-showcase/tags-autocomplete-example';
import { RouterModule } from '@angular/router';
import { FeaturesRootComponent } from './root';
import { ComponentsListComponent } from './components-showcase/components-list';
import { MaterialModule, MdButtonModule } from '@angular/material';
import { ExampleComponentsContainer } from './components-showcase/components-container';

const MD_MODULES = [MaterialModule, MdButtonModule];

@NgModule({
  imports: [
    ...MD_MODULES,
    TagsAutoCompleteModule,
    RouterModule.forChild([
      {
        path: '',
        component: FeaturesRootComponent,
        data: {
          isRoot: true,
        },
        children: [
          {
            path: 'tags-auto-complete',
            component: TagsAutoCompleteExampleComponent,
            data: {
              breadcrumb: 'Tags auto complete',
            },
          },
          {
            path: '',
            component: ComponentsListComponent,
            data: {
              breadcrumb: 'Select a component',
            },
          },
        ],
      },
    ]),
  ],
  declarations: [
    FeaturesRootComponent,
    TagsAutoCompleteExampleComponent,
    ComponentsListComponent,
    ExampleComponentsContainer,
  ],
})
export class FeaturesModule {}
