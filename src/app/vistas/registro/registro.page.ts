import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  _entradaMail:string = '';
  _entradaContra:string = '';

  constructor(
    private auth:AngularFireAuth,
    private router:Router)
    { }

  ngOnInit() {
  }

  async registro(){
    try{
      const solicitud = await this.auth.createUserWithEmailAndPassword(this._entradaMail, this._entradaContra);
      //console.log(solicitud);
    }catch(error:any){
      console.log(error.code)
    }
  }

}
