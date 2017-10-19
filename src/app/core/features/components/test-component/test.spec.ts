import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestComponent } from './test.component';
import { TestModule } from './test.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('TestComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, TestModule],
      }).compileComponents();
    }),
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('snapshots', () => {
    expect(fixture).toMatchSnapshot();
  });
});
