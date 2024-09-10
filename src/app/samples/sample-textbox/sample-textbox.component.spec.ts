import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleTextboxComponent } from './sample-textbox.component';

describe('SampleTextboxComponent', () => {
  let component: SampleTextboxComponent;
  let fixture: ComponentFixture<SampleTextboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SampleTextboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleTextboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
