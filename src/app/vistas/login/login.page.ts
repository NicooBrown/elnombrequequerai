import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email : string = "";
  contrasena : string = "";

  constructor(private router:Router, 
    private auth:AngularFireAuth) { }

  ngOnInit() {
  }
  
  async onEnviarFormulario(){
   
    try{
      await this.auth.signInWithEmailAndPassword(this.email, this.contrasena).then(()=>{
        this.router.navigateByUrl('/feed');
      })
    }catch(error:any){
      console.log(error.code);
    }
    
  }

}
