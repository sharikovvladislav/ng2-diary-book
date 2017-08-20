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

import * as userActions from '../../core/actions/user';
import * as diaryActions from '../actions/diary-entries';

fdescribe('MyDairyPageComponent', () => {
  let component: MyDairyPageComponent;
  let fixture: ComponentFixture<MyDairyPageComponent>;
  let store: Store<fromFeature.State>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
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
        providers: [
          DialogFactoryService,
          DiaryProcessorService,
          DiaryEntryService,
        ],
      }).compileComponents();

      store = TestBed.get(Store);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MyDairyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  fit('', () => {
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
        {
          createDate: '2017-08-16T21:02:02.214Z',
          date: '2017-08-16T21:00:00.000Z',
          message: '121231qweqweqwe',
          $key: '-KrgqaYUDfuXwgZPaR2d',
        },
        {
          createDate: '2017-08-04T20:40:26.069Z',
          date: '2017-08-05T21:00:00.000Z',
          message: '1234',
          $key: '-KqixNAeIUY78niP-FzF',
        },
        {
          createDate: '2017-08-03T21:44:26.011Z',
          date: '2017-08-03',
          message: 'kek',
          $key: '-Kq_Q4_HVOFUaZs7iT2j',
        },
        {
          createDate: '2017-08-03T00:08:34.529Z',
          date: '2017-07-29',
          message: 'more entry1',
          $key: '-KqA2Gqx6kba6u1JUVNM',
        },
        {
          createDate: '2017-08-04T20:42:24.552Z',
          date: '2017-07-28',
          message: 'qweqweйцуq1',
          $key: '-Kqixrc50nd1ATqRpNB_',
        },
        {
          createDate: '2017-07-28T21:14:41.213Z',
          date: '2017-07-28',
          message: 'more entry',
          $key: '-KqA2HP9rvgINAwnVW5A',
        },
        {
          createDate: '2017-07-30T14:38:19.425Z',
          date: '2017-07-28',
          message: 'keks1',
          $key: '-Kq9mng3hRbReY26-src',
        },
      ])
    );

    fixture.detectChanges();

    console.log('kek');
    console.log(fixture.nativeElement.innerHTML);
  });
});
