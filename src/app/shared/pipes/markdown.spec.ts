import { MarkdownPipe } from './markdown';
import * as markdown from 'markdown-js';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, Input } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('Markdown', () => {
  describe('as a class', () => {
    let pipe, makeHTMLSpy;

    beforeEach(() => {
      pipe = new MarkdownPipe();

      makeHTMLSpy = jest.spyOn(markdown, 'makeHtml');
    });
    afterEach(() => {
      makeHTMLSpy.mockRestore();
    });

    describe('test', () => {
      let result;

      beforeEach(() => {
        result = pipe.transform('kek');
      });

      it('should transform the input', () => {
        expect(result).toBe('<p>kek</p>');
      });

      it('should call the markdown library method', () => {
        expect(makeHTMLSpy).toBeCalledWith('kek');
      });
    });
  });

  describe('with a test component', function() {
    @Component({
      template: '<div>{{ text | diaryMarkdown }}</div>',
    })
    class TestComponent {
      @Input() text: string;
    }

    let component: TestComponent,
      fixture: ComponentFixture<TestComponent>,
      debugElement: DebugElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [TestComponent, MarkdownPipe],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      debugElement = fixture.debugElement.query(By.css('div'));

      fixture.detectChanges();
    });

    it('snapshot is correct', () => {
      component.text = `
        # Header
        ## Second level header

        - bob
        - kek
        - lul

        How are you?
        ===============

        Another header
        ---------------------------

        **bob**
      `;

      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });

    it('snapshot is correct 22228', () => {
      component.text = 'header h1\n===\n\nabc\n\n*italic* **bold**';

      fixture.detectChanges();

      expect(fixture).toMatchSnapshot();
    });

    it('span contains correct stuff', () => {
      component.text = '*italic* **bold**';

      fixture.detectChanges();

      expect(debugElement.nativeElement.textContent).toBe(
        '<p><em>italic</em> <strong>bold</strong></p>',
      );
    });
  });
});
