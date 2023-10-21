import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/servicios/sesion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email : string = "";
  contrasena : string = "";

  constructor(
    private sesion:SesionService
  ){}

  ngOnInit() {
  }
  
  onEnviarFormulario = async () => this.sesion.intentarLoggeo(this.email, this.contrasena);

}
