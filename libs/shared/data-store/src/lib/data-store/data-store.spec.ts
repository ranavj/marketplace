import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataStore } from './data-store';

describe('DataStore', () => {
  let component: DataStore;
  let fixture: ComponentFixture<DataStore>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataStore],
    }).compileComponents();

    fixture = TestBed.createComponent(DataStore);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
