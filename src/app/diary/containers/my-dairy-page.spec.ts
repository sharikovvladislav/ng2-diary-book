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

import { MdIconModule } from '@angular/material';

import * as userActions from '../../core/actions/user';
import * as diaryActions from '../actions/diary-entries';

import { EntryListMockMetadata } from '../../core/components/__mocks__/entry-list-mock-metadata';
import { EntryListComponent } from '../../core/components/entry-list';

describe('MyDairyPageComponent', () => {
  let component: MyDairyPageComponent;
  let fixture: ComponentFixture<MyDairyPageComponent>;
  let store: Store<fromFeature.State>;

  beforeEach(
    async(() => {
      TestBed.overrideComponent(EntryListComponent, {
        set: EntryListMockMetadata,
      })
        .configureTestingModule({
          imports: [
            MdIconModule,
            StoreModule.forRoot({
              ...fromRoot.reducers,
              diary: combineReducers(fromFeature.reducers),
            }),
            ComponentsModule,
            CoreModule,
          ],
          declarations: [MyDairyPageComponent],
          providers: [DialogFactoryService, DiaryProcessorService],
        })
        .compileComponents();

      store = TestBed.get(Store);
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDairyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('полная имитация', () => {
    it('', () => {
      const userDataMock = {
        /*...*/
      };
      store.dispatch(new userActions.LoadUserAction(userDataMock));
      store.dispatch(
        new diaryActions.LoadListSuccessAction([
          {
            createDate: '2017-08-19T23:22:34.856Z',
            date: '2017-08-19T21:00:00.000Z',
            message: '13123123asdasdasd',
            $key: '-KrwnXF5o7VRJDTXJw-I',
          },
          {
            createDate: '2017-08-17T15:24:17.399Z',
            date: '2017-08-16T21:00:00.000Z',
            message: '123123123123123',
            $key: '-KrkmsupthRsqGXqVBeK',
          },
        ]),
      );

      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });
  });
});
