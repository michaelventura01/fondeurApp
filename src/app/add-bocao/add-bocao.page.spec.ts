import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddBocaoPage } from './add-bocao.page';

describe('AddBocaoPage', () => {
  let component: AddBocaoPage;
  let fixture: ComponentFixture<AddBocaoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBocaoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddBocaoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
