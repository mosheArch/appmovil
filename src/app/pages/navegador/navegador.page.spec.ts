import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NavegadorPage } from './navegador.page';

describe('NavegadorPage', () => {
  let component: NavegadorPage;
  let fixture: ComponentFixture<NavegadorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavegadorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NavegadorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
