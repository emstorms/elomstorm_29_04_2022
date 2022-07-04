import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationMessageComponent } from './creation-message.component';

describe('CreationMessageComponent', () => {
  let component: CreationMessageComponent;
  let fixture: ComponentFixture<CreationMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
