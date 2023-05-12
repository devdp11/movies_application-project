import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionPage } from './action.page';

describe('ActionPage', () => {
  let component: ActionPage;
  let fixture: ComponentFixture<ActionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ActionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
