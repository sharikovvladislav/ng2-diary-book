import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  template: `
    <md-card>
      <md-card-header>
        <h4>Добавление записи</h4><span (click)="goBack();">Назад <md-icon><i class="material-icons">arrow_back</i></md-icon></span>
      </md-card-header>
      <diary-entry-create></diary-entry-create>
    </md-card>
  `,
})
export class EntryCreateContainer {
  goBack() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  constructor(private router: Router, private route: ActivatedRoute) {}
}
