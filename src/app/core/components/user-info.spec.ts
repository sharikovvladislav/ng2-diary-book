/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoComponent } from './user-info';
import { MdIconModule } from '@angular/material';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('UserInfoComponent', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
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
      it('should match snapshot', () =>
        expect(fixture.nativeElement.innerHTML).toMatchSnapshot());
    });
    describe('photoURL is not passed', () => {
      beforeEach(() => {
        component.photoURL = '';
        fixture.detectChanges();
      });
      it('hasPhotoURL should be falsy', () =>
        expect(component.hasPhotoURL()).toBeFalsy());
      it('should match snapshot', () =>
        expect(fixture.nativeElement.innerHTML).toMatchSnapshot());
    });
  });

  describe('should handle displayName correctly', () => {
    it('should show display name if it is passed', () => {
      component.displayName = 'vova chuma';
      fixture.detectChanges();

      expect(fixture.nativeElement.innerHTML).toMatchSnapshot();
    });
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
