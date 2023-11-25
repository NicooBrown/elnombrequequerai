import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/servicios/helper.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clave',
  templateUrl: './clave.page.html',
  styleUrls: ['./clave.page.scss'],
})
export class ClavePage implements OnInit {
  email : string = "";

  constructor( 
    private help: HelperService,
    private auth:AngularFireAuth,
    private router:Router) { }

  ngOnInit() {
  }

  async cambiarClave(){
    if (this.email == '') {
      this.help.showAlert("¿Y el correo?, ¿Donde está?" ,"Error");
      return;
    }
    try {
      await this.auth.sendPasswordResetEmail(this.email);
      await this.help.showAlert("Revise su correo","Información");
      await this.router.navigateByUrl("clave");
    } catch (error:any) {
      console.log(error.code)
      console.log(typeof error)
      if (error.code = 'auth/user-not-found' || error.code == 'auth/invalid-email') {
        await this.help.showAlert("Hubo un problema con el correo.","Error");
      }else{
        await this.help.showAlert("Hubo un error desconocido.","Error");
      }
    }
  }
}
