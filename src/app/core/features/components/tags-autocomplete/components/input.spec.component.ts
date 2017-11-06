import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsAutoCompleteInputComponent } from './input.component';
import { TagsAutoCompleteModule } from '../tags-autocomplete.module';
import { EventEmitter } from '@angular/core';

describe('TagsAutoCompleteInputComponent', () => {
  let component: TagsAutoCompleteInputComponent;
  let fixture: ComponentFixture<TagsAutoCompleteInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TagsAutoCompleteModule],
    });
  });

  describe('test methods in ngOnInit', () => {
    it('should clear input value on receive "clearInputValue" event', () => {
      fixture = TestBed.createComponent(TagsAutoCompleteInputComponent);
      component = fixture.componentInstance;

      component.clearInputValue = new EventEmitter();

      fixture.detectChanges();

      component.inputValue = 'some value';

      component.clearInputValue.emit();

      expect(component.inputValue).toEqual('');
    });

    it('should focus input field on receive "focusInputField" event', () => {
      fixture = TestBed.createComponent(TagsAutoCompleteInputComponent);
      component = fixture.componentInstance;

      component.focusInputField = new EventEmitter();

      fixture.detectChanges();

      spyOn(component, 'focusInput');

      component.focusInputField.emit();

      expect(component.focusInput).toHaveBeenCalled();
    });
  });

  describe('general tests', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TagsAutoCompleteInputComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
