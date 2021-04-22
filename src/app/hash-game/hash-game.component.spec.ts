import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashGameComponent } from './hash-game.component';

describe('HashGameComponent', () => {
  let component: HashGameComponent;
  let fixture: ComponentFixture<HashGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HashGameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HashGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
