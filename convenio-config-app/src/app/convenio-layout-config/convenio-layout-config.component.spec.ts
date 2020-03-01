import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvenioLayoutConfigComponent } from './convenio-layout-config.component';

describe('ConvenioLayoutConfigComponent', () => {
  let component: ConvenioLayoutConfigComponent;
  let fixture: ComponentFixture<ConvenioLayoutConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConvenioLayoutConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvenioLayoutConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
