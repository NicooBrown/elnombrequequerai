import { TestBed } from '@angular/core/testing';

import { HelperService } from './helper.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

describe('HelperService', () => {

  let service: HelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [ IonicModule.forRoot(), AngularFireModule, AngularFireModule.initializeApp(environment.firebase),  ],
      providers: [HelperService, ModalController] 
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
