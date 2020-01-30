import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PouchdbComponent } from './pouchdb.component';

describe('PouchdbComponent', () => {
  let component: PouchdbComponent;
  let fixture: ComponentFixture<PouchdbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PouchdbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PouchdbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
