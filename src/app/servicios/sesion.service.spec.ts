import { TestBed } from '@angular/core/testing';

import { SesionService } from './sesion.service';
import { IonicModule } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

describe('SesionService', () => {
  let service: SesionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ IonicModule.forRoot(), AngularFireModule, AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule],
      providers: [SesionService]  
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(SesionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
