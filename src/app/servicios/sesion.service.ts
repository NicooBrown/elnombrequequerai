import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Preferences } from '@capacitor/preferences';
import { _usuarios , _asignaturas, _activo } from '../esquema/preferencias';
import { HelperService } from 'src/app/servicios/helper.service';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private router:Router, 
    private auth:AngularFireAuth, 
    private help: HelperService) {}

  async intentarLoggeo(email : string , pass : string ) : Promise<Object> {
    const _loader = await this.help.showLoader("Iniciando sesión.");
    try{
      let errores = undefined;
      if(!email) errores = 'Introduce tu correo.';
      if(!pass) errores = 'Introduce tu contraseña.';
      if( errores ){
        this.help.showAlert(errores, 'Error!');
        throw new Error(errores);
      }

      let solicitud = await this.auth.signInWithEmailAndPassword(email, pass);
      
      await this.poblarPreferenciasSiEsNecesario();

      // Sesion
      let nuevoValor : any = {};
      const {value} = await Preferences.get( { key: 'sesion' } );
      nuevoValor = JSON.parse(value!);
      nuevoValor.userActivo = email;
      await Preferences.set( {key: 'sesion', value: JSON.stringify(nuevoValor)} );

      this.router.navigateByUrl('/feed');
    }catch(error:any){
      console.log(error);
    }
    _loader.dismiss();
    return {};

  }

  async intentarRegistro( datosFirebase : any , metadatos : any , comunas : any, regiones: any) : Promise<Object>{
    const confirmacion = await this.help.showConfirm("¿Seguro de que llenaste todo correctamente?", "si", "no");
    if(!confirmacion) return {};
    const _loader = await this.help.showLoader("Un momento.");
    try{
      let nuevoValor : any;
      const {value} = await Preferences.get( { key: 'metadataUsuarios' } );
  
      if(!value) nuevoValor = _usuarios;
      else nuevoValor = JSON.parse(value);

      let error = undefined;

      if( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datosFirebase.mail) ) error = 'correo inválido';
      if( !datosFirebase.mail ) error = 'Debes introducir un correo.';
      if( !datosFirebase.pass ) error = 'Debes introducir una contraseña';
      if( datosFirebase.pass.length < 6 ) error = 'Debes introducir una contraseña de al menos 6 carácteres';
      if( !metadatos.nombre ) error = 'Debes introducir un nombre.';
      if( metadatos.comuna == 0 ) error = 'Debes introducir una comuna.';
      if( metadatos.region == 0 ) error = 'Debes introducir una región.';

      if(error){
        this.help.showAlert(error, 'Error!');
        throw new Error(error);
      }

      const solicitud = await this.auth.createUserWithEmailAndPassword(datosFirebase.mail, datosFirebase.pass);
  
      let _reg : any, _com : any;
      regiones.forEach( (__region : any)=> {
        if(__region.id == metadatos.region) _reg = __region.nombre;
      });
      comunas.forEach( (__comuna : any)=> {
        if(__comuna.id == metadatos.comuna) _com = __comuna.nombre;
      });

      nuevoValor[ datosFirebase.mail ] = {
        nombre:metadatos.nombre,
        apellido:metadatos.apellido,
        comuna:_com,
        region:_reg,
      };
      nuevoValor.__.push(datosFirebase.mail);
      await Preferences.set( {key: 'metadataUsuarios', value: JSON.stringify(nuevoValor)} );
      this.router.navigateByUrl('/login');
      this.help.showToast("Cuenta registrada con éxito.");
    }catch(error:any){
      if (error.code == 'auth/email-already-in-use') {
        await this.help.showAlert("Email registrado previamente.","Error");
      }
      if (error.code == 'auth/invalid-email') {
        await this.help.showAlert("Email erróneo.","Error");
      }
      if (error.code == 'auth/weak-password') {
        await this.help.showAlert("La tienes muy corta (la contraseña).","Error");
      }
    }
    _loader.dismiss();
    // await Preferences.set( {key: 'sesion', value: JSON.stringify(_activo)} );
    return {};
  }

  async poblarPreferenciasSiEsNecesario(){
    // metadatos
    let nuevoValor : any;
    let {value} = await Preferences.get( { key: 'metadataUsuarios' } );
    if(!value) nuevoValor = _usuarios;
    else nuevoValor = JSON.parse(value);
    
    await Preferences.set( {key: 'metadataUsuarios', value: JSON.stringify(nuevoValor)} );

    // Ramos
    nuevoValor = {};
    ({value} = await Preferences.get( { key: 'asignaturas' } ));
    if(!value) nuevoValor = _asignaturas;
    else nuevoValor = JSON.parse(value);
    
    await Preferences.set( {key: 'asignaturas', value: JSON.stringify(nuevoValor)} );

    // Asistencias
    nuevoValor = {};
    ({value} = await Preferences.get( { key: 'asistencias' } ));
    if(!value) nuevoValor = [];
    else nuevoValor = JSON.parse(value);

    await Preferences.set( {key: 'asistencias', value: JSON.stringify(nuevoValor)} );

    // Activo
    nuevoValor = {};
    ({value} = await Preferences.get( { key: 'sesion' } ));
    if(!value) nuevoValor = _activo;
    else nuevoValor = JSON.parse(value);

    await Preferences.set( {key: 'sesion', value: JSON.stringify(nuevoValor)} );
  }
  async deslogear(){
    this.auth.signOut();
    this.router.navigateByUrl('/login');
  }
  async obtenerDatosUsuario(){
    let {value} = await Preferences.get({key: 'sesion'});
    const usuarioActual = JSON.parse(value!).userActivo;

    ({value} = await Preferences.get({key: 'metadataUsuarios'}));
    const usuarios = JSON.parse(value!);

    if(Object.keys( usuarios ).includes( usuarioActual )){
      return { ...usuarios[usuarioActual] , email : usuarioActual};
    }else{
      return null;
    }
  }
}
