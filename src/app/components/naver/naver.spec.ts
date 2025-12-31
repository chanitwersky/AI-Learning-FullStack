import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Naver } from './naver';

describe('Naver', () => {
  let component: Naver;
  let fixture: ComponentFixture<Naver>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Naver]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Naver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
