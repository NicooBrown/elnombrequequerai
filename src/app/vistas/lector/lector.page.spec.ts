import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LectorPage } from './lector.page';
import { IonicModule, ModalController } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('LectorPage', () => {
  let component: LectorPage;
  let fixture: ComponentFixture<LectorPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LectorPage],
      imports: [ IonicModule.forRoot(), AngularFireModule, AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule],
      providers: [ModalController]  
    });
    fixture = TestBed.createComponent(LectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
