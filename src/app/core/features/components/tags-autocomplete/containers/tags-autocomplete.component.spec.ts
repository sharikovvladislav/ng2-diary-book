import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsAutoCompleteContainerComponent } from './tags-autocomplete';
import { TagsAutoCompleteModule } from '../tags-autocomplete.module';
import { TagsService } from '../../../../services/tags';

describe('TagsAutoCompleteContainerComponent', () => {
  let component: TagsAutoCompleteContainerComponent;
  let fixture: ComponentFixture<TagsAutoCompleteContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TagsAutoCompleteModule],
      providers: [{ provide: TagsService, useValue: {} as TagsService }],
    });
  });

  describe('general tests', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TagsAutoCompleteContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
