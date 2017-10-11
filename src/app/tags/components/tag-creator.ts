import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'tags-creator',
  template: `
    <md-input-container>
      <input mdInput
             #input
             [(ngModel)]="value"
             (keyup.enter)="onEnterPressed.emit(input.value);"
             placeholder="Введите название тега..."
             mask="XXXXXXXXXXXXXXX"
      />
    </md-input-container>
  `,
})
export class TagCreatorComponent implements OnInit {
  value = '';
  @Input() clearValue: EventEmitter<any> = new EventEmitter();
  @Output() onEnterPressed = new EventEmitter();

  ngOnInit() {
    this.clearValue.subscribe(() => (this.value = ''));
  }
}
