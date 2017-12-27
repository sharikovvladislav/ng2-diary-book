import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoComponent } from './user-info';
import { MdIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MyTestBed } from '../../test/helpers/my-test-bed';

describe('UserInfoComponent', () => {
  describe('shallow tests', () => {
    let component: UserInfoComponent;
    let fixture: ComponentFixture<UserInfoComponent>;

    beforeEach(
      async(() => {
        MyTestBed.configureTestingModule({
          imports: [MdIconModule],
          declarations: [UserInfoComponent],
        })
          .shallowRenderComponent(UserInfoComponent)
          .compileComponents();
      }),
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(UserInfoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('should handle photoURL correctly', () => {
      describe('photoURL is passed', () => {
        beforeEach(() => {
          component.photoURL = 'somePhoto';
          fixture.detectChanges();
        });
        it('hasPhotoURL should be truthy', () =>
          expect(component.hasPhotoURL()).toBeTruthy());
        it('should match snapshot', () => expect(fixture).toMatchSnapshot());
      });
      describe('photoURL is not passed', () => {
        beforeEach(() => {
          component.photoURL = '';
          fixture.detectChanges();
        });
        it('hasPhotoURL should be falsy', () =>
          expect(component.hasPhotoURL()).toBeFalsy());
        it('should match snapshot', () => expect(fixture).toMatchSnapshot());
      });
    });

    describe('should handle displayName correctly', () => {
      it('should show display name if it is passed', () => {
        component.displayName = 'vova chuma';
        fixture.detectChanges();

        expect(fixture).toMatchSnapshot();
      });
    });
  });

  describe('not shallow tests', () => {
    let component: UserInfoComponent;
    let fixture: ComponentFixture<UserInfoComponent>;

    beforeEach(
      async(() => {
        MyTestBed.configureTestingModule({
          imports: [MdIconModule],
          declarations: [UserInfoComponent],
        }).compileComponents();
      }),
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(UserInfoComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should handle click on exit button', () => {
      const spy = jest.fn();
      component.onExit.subscribe(spy);

      const de: DebugElement = fixture.debugElement.query(
        By.css('span > md-icon'),
      );

      de.triggerEventHandler('click', null);

      expect(spy).toHaveBeenCalled();
    });
  });
});
