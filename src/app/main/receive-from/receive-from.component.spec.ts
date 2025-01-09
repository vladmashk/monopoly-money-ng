import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveFromComponent } from './receive-from.component';

describe('ReceiveFromComponent', () => {
  let component: ReceiveFromComponent;
  let fixture: ComponentFixture<ReceiveFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReceiveFromComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceiveFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
