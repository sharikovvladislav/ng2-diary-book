import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MaterialModule,
  MdButtonModule,
  MdIconModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './modules/http-interceptors/auth-append-token';

import { AppComponent } from './containers/app';
import { NotFoundPageComponent } from './containers/not-found-page';
import { LayoutComponent } from './components/layout';
import { NavItemComponent } from './components/nav-item';
import { SidenavComponent } from './components/sidenav';
import { ToolbarComponent } from './components/toolbar';
import { NotLoggedInComponent } from './components/not-logged-in';
import { CommonShowIfLoggedInComponent } from './containers/common-show-if-logged-in';
import { LoaderComponent } from './containers/loader';
import { BreadcrumbsComponent } from './components/breadcrumbs';
import { BreadcrumbsContainer } from './containers/breadcrumbs';

import { BreadcrumbsService } from './services/breadcrumbs';

import { PipesModule } from '../shared/pipes';
import { EffectsModule } from '@ngrx/effects';
import { RouterEffects } from './effects/router';
import { FormsModule } from '@angular/forms';
import { TagsAutoCompleteModule } from './features/components/tags-autocomplete/tags-autocomplete.module';
import { TagsViewerModule } from './features/components/tags-viewer/tags-viewer.module';

export const COMPONENTS = [
  AppComponent,
  NotFoundPageComponent,
  LayoutComponent,
  NavItemComponent,
  SidenavComponent,
  ToolbarComponent,
  NotLoggedInComponent,
  CommonShowIfLoggedInComponent,
  LoaderComponent,
  BreadcrumbsComponent,
  BreadcrumbsContainer,
];

const MD_MODULES = [MaterialModule, MdButtonModule, MdIconModule];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ...MD_MODULES,
    RouterModule,
    PipesModule,
    HttpClientModule,
    EffectsModule.forRoot([RouterEffects]),
    TagsAutoCompleteModule,
    TagsViewerModule,
  ],
  declarations: COMPONENTS,
  exports: [
    ...COMPONENTS,
    CommonModule,
    FormsModule,
    ...MD_MODULES,
    HttpClientModule,
    TagsAutoCompleteModule,
    TagsViewerModule,
  ],
  providers: [
    BreadcrumbsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
    };
  }
}
