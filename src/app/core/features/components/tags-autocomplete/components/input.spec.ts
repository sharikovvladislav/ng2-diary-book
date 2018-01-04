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

    describe('backspace checks', () => {
      it('when internal on backspace method called, should emit value to deleteTag output', () => {
        expect.assertions(1);

        component.selectedTags = [{ name: 'first' }, { name: 'second' }];

        const spy = jest.fn();

        component.deleteTag.subscribe(spy);

        component.onBackspacePressed({ length: 0 });

        expect(spy).toHaveBeenCalledWith(component.selectedTags[1]);
      });

      it('when backspace pressed, event handler is called', () => {
        const spy = jest.spyOn(component, 'onBackspacePressed');
        const event = new KeyboardEvent('keydown', {
          key: 'backspace',
        });
        de.query(By.css('input')).nativeElement.dispatchEvent(event);

        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();

        spy.mockReset();
      });
    });

    it('focus on element is called when handler is called', () => {
      const input = de.query(By.css('input')).nativeElement;

      const spy = jest.spyOn(input, 'focus');

      component.focusInput();

      expect(spy).toHaveBeenCalled();
    });

    it('should emit deleted tag to output when clicked on delete button', () => {
      const spy = jest.fn();
      component.deleteTag.subscribe(spy);

      component.selectedTags = [{ name: 'A' }, { name: 'B' }];

      fixture.detectChanges();

      const selectedTags = de.queryAll(By.css('.selectedTags > .tag'));
      expect(selectedTags.length).toBe(2);

      const deleteButton = selectedTags[0].query(By.css('span'));
      deleteButton.nativeElement.dispatchEvent(new MouseEvent('click'));

      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith(component.selectedTags[0]);
    });

    it('should render selectedTags accordingly to input', () => {
      expect(de.queryAll(By.css('.selectedTags > .tag')).length).toBe(0);

      component.selectedTags = [{ name: '1' }, { name: '2' }];

      fixture.detectChanges();

      expect(de.queryAll(By.css('.selectedTags > .tag')).length).toBe(2);

      component.selectedTags = [{ name: '1' }, { name: '2' }, { name: 'x' }];

      fixture.detectChanges();

      expect(de.queryAll(By.css('.selectedTags > .tag')).length).toBe(3);
    });
  });
});
