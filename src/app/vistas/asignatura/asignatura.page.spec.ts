import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignaturaPage } from './asignatura.page';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { IonicModule, ModalController } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { RouterModule } from '@angular/router';

describe('AsignaturaPage', () => {
  let component: AsignaturaPage;
  let fixture: ComponentFixture<AsignaturaPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignaturaPage],
      imports: [ IonicModule.forRoot(), AngularFireModule, AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule, RouterModule.forRoot([])],
      providers: [ModalController]  
    });
    fixture = TestBed.createComponent(AsignaturaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
