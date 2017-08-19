/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store, StoreModule, combineReducers } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRoot from '../../reducers';

import { MyDairyPageComponent } from './my-dairy-page';
import { ComponentsModule } from '../components';
import { CoreModule } from '../../core/core.module';
import { DialogFactoryService } from '../services/dialog-factory';
import { DiaryProcessorService } from '../services/diary-processor';
import { DiaryEntryService } from '../services/diary-entry';

import { MdIconModule } from '@angular/material';

describe('MyDairyPageComponent', () => {
  let component: MyDairyPageComponent;
  let fixture: ComponentFixture<MyDairyPageComponent>;
  let store: Store<fromFeature.State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdIconModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          'diary': combineReducers(fromFeature.reducers)
        }),
        ComponentsModule,
        CoreModule
      ],
      declarations: [
        MyDairyPageComponent,
      ],
      providers: [
        DialogFactoryService, DiaryProcessorService, DiaryEntryService
      ]
    })
    .compileComponents();

    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDairyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
