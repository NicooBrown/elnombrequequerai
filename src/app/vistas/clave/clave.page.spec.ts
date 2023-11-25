import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClavePage } from './clave.page';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('ClavePage', () => {
  let component: ClavePage;
  let fixture: ComponentFixture<ClavePage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClavePage],
      imports: [ IonicModule.forRoot(), AngularFireModule, AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule],
      providers: []  
    });
    fixture = TestBed.createComponent(ClavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
