/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Store, StoreModule, combineReducers } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromRoot from '../../reducers';

import { MyDairyPageComponent } from './my-dairy-page';

import * as userActions from '../../core/actions/user';
import * as diaryActions from '../actions/diary-entries';

import { EntryListMockMetadata } from '../../core/components/__mocks__/entry-list-mock-metadata';
import { EntryListComponent } from '../components/diary-entries-list';

import { CommonShowIfLoggedInComponent } from '../../core/containers/common-show-if-logged-in';
import { NotLoggedInComponent } from '../../core/components/not-logged-in';
import { MdCardModule } from '@angular/material';
import { TagsAutoCompleteModule } from '../../core/features/components/tags-autocomplete/tags-autocomplete.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RouterHelperService } from '../../core/services/router';

xdescribe('MyDairyPageComponent', () => {
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
            MdCardModule,
            TagsAutoCompleteModule,
            RouterTestingModule,
            StoreModule.forRoot({
              diary: combineReducers(fromFeature.reducers),
            }),
          ],
          declarations: [
            CommonShowIfLoggedInComponent,
            NotLoggedInComponent,
            EntryListComponent,
            MyDairyPageComponent,
          ],
          providers: [
            RouterHelperService,
            // {
            //   provide: Store,
            //   useValue: {
            //     select: jest.fn()
            //   }
            // }
          ],
        })
        .compileComponents();

      store = TestBed.get(Store);

      spyOn(store, 'dispatch').and.callThrough();
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
      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });
  });
});
