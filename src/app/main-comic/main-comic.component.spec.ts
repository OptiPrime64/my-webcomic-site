import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComicComponent } from './main-comic.component';

describe('MainComicComponent', () => {
  let component: MainComicComponent;
  let fixture: ComponentFixture<MainComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
