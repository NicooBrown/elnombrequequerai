import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DepurarPage } from './depurar.page';

describe('DepurarPage', () => {
  let component: DepurarPage;
  let fixture: ComponentFixture<DepurarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(DepurarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
