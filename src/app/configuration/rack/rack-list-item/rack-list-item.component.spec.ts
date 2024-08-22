import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RackListItemComponent } from './rack-list-item.component';

describe('RackListItemComponent', () => {
  let component: RackListItemComponent;
  let fixture: ComponentFixture<RackListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RackListItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RackListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
