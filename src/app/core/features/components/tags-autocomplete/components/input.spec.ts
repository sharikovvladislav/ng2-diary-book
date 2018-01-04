import { MyTestBed } from '../../../../../test/helpers/my-test-bed';

import { TagsAutoCompleteInputComponent } from './input';
import { FormsModule } from '@angular/forms';
import { TagsAutoCompleteLoaderComponent } from './loader';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { DebugElement, EventEmitter } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('TagsAutoCompleteInputComponent', () => {
  let component: TagsAutoCompleteInputComponent;
  let fixture: ComponentFixture<TagsAutoCompleteInputComponent>;
  let de: DebugElement;

  describe('tests by snapshots', () => {
    beforeEach(async () => {
      MyTestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [
          TagsAutoCompleteInputComponent,
          TagsAutoCompleteLoaderComponent,
        ],
      })
        .shallowRenderComponent(TagsAutoCompleteLoaderComponent)
        .compileComponents();
    });

    beforeEach(() => {
      fixture = MyTestBed.createComponent(TagsAutoCompleteInputComponent);
      component = fixture.componentInstance;

      fixture.detectChanges();
    });

    it('initial rendering is ok', () => {
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('tests in general', () => {
    beforeEach(async () => {
      MyTestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [
          TagsAutoCompleteInputComponent,
          TagsAutoCompleteLoaderComponent,
        ],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = MyTestBed.createComponent(TagsAutoCompleteInputComponent);
      component = fixture.componentInstance;
      de = fixture.debugElement;

      fixture.detectChanges();
    });

    it('placeholder input renders correctly', () => {
      component.placeholder = 'abc';

      fixture.detectChanges();

      const inputNode = de.query(By.css('input'));

      expect(inputNode.nativeElement.placeholder).toBe('abc');
    });

    it(
      'clear input if event emitter at input emitted some stuff',
      fakeAsync(() => {
        expect.assertions(2);

        component.inputValue = 'some value';

        fixture.detectChanges();

        tick();

        expect(de.query(By.css('div > input')).nativeElement.value).toBe(
          'some value',
        );

        component.clearInput();

        fixture.detectChanges();

        tick();

        expect(de.query(By.css('div > input')).nativeElement.value).toBe('');
      }),
    );
  });
});
