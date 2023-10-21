import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { SesionService } from 'src/app/servicios/sesion.service';
import { Comuna , Region } from 'src/app/esquema/local';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  _entradaMail:string = '';
  _entradaContra:string = '';
  _entradaNombre:string = '';
  _entradaApellido:string = '';

  regiones:Region[]=[];
  comunas:Comuna[]=[];
  regionSel:number = 0;
  comunaSel:number = 0;
  comunaDisactivada:boolean = true;

  constructor(
    private sesion: SesionService,
    private rest: RestService)
    { }

  ngOnInit() {
    this.prepararRegiones();
  }

  prepararRegiones = async () => this.regiones = (await this.rest.cargarRegiones()).data;
  
  prepararComunas = async() => {
    this.comunas = (await this.rest.cargarComunas(this.regionSel)).data;
    this.comunaDisactivada= false;
  }

  async registro(){
    await this.sesion.intentarRegistro( { mail: this._entradaMail, pass: this._entradaContra }, {
      nombre: this._entradaNombre,
      apellido: this._entradaApellido,
      region: this.regionSel,
      comuna: this.comunaSel
    },  this.comunas, this.regiones);
    // try{
    //   const solicitud = await this.auth.createUserWithEmailAndPassword(this._entradaMail, this._entradaContra);
    //   //console.log(solicitud);
    // }catch(error:any){
    //   console.log(error.code)
    // }
  }

}