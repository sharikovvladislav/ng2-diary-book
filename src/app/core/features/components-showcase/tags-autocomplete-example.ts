import { Component } from '@angular/core';

@Component({
  selector: 'app-tags-auto-complete-example',
  template: `
    <app-examples-container>
      <p>
        <tags-auto-complete [(selectedTags)]="firstExampleValue"
                            (selectedTagsChange)="onFirstExampleChange($event)"
        ></tags-auto-complete>
      </p>
      <p>
        <tags-auto-complete [(selectedTags)]="secondExampleValue"
                            (selectedTagsChange)="onSecondExampleChange($event);"
        ></tags-auto-complete>
      </p>
    </app-examples-container>
  `,
})
export class TagsAutoCompleteExampleComponent {
  firstExampleValue = [
    { id: 1, name: 'здоровье' },
    { id: 5, name: '52недели' },
  ];
  secondExampleValue = [
    { description: '', id: 9, name: 'пятница' },
    { description: '', id: 20, name: 'личные-проекты' },
  ];

  onFirstExampleChange(newTags) {
    console.log('first new data', newTags);
    console.log('first model data', this.firstExampleValue);
  }

  onSecondExampleChange(newTags) {
    console.log('second new data', newTags);
    console.log('second model data', this.firstExampleValue);
  }
}
