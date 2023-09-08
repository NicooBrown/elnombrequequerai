import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email : string = "";
  contrasena : string = "";

  constructor(private router:Router) { }

  ngOnInit() {
  }
  
  onEnviarFormulario(){
    if(this.email.toUpperCase() == "PGY4121-001D" && this.contrasena.toUpperCase() == "PGY4121-001D"){
      this.router.navigateByUrl('feed')
    }else{
      alert("Contra o user incorrecto.");
    }
    
  }

}
