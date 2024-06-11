import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebProdsComponent } from './web-prods.component';

describe('WebProdsComponent', () => {
  let component: WebProdsComponent;
  let fixture: ComponentFixture<WebProdsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WebProdsComponent]
    });
    fixture = TestBed.createComponent(WebProdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
