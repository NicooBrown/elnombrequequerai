import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {

  constructor(private router:Router) {

  }

  async guardarAsistencia( metadatos : any ) : Promise<Object>{
    let estado = {exito: true, razon: ''};


    let {value} = await Preferences.get({key: 'asignaturas'});
    let asignaturas : any = JSON.parse(value!);
    const json = JSON.parse(metadatos);
    if( !asignaturas ) return {};
    asignaturas[json.asignatura] = {
      asignatura: json.asignatura ,
      ultimoDocente: [ json.docente ]
    };
    asignaturas.__.push(json.asignatura);
    await Preferences.set( {key: 'asignaturas', value: JSON.stringify(asignaturas)} );
    ({value} = await Preferences.get({key: 'asistencias'}));
    let _asistencias : any = JSON.parse( value! );
    console.log(_asistencias);

    ({value} = await Preferences.get({key: 'sesion'}));
    const usuarioActivo = JSON.parse(value!).userActivo;

    _asistencias.some( (asis : any) => asis.asignatura == json.asignatura 
      && asis.seccion == json.seccion 
      && asis.fecha == json.fecha
      && asis.hora == json.hora
      && asis.aula == json.aula) ? estado = {exito: false, razon: 'Error: Asistencia ya registrada. '} :
        _asistencias.push( {
          asignatura: json.asignatura,
          seccion: json.seccion,
          docente: json.docente,
          sala: json.sala,
          fecha: json.fecha,
          hora: json.hora,
          leccion: json.leccion,
          usuario: usuarioActivo
        });
    console.log(estado);
    if( !estado.exito ) return estado;
    await Preferences.set( {key: 'asistencias', value: JSON.stringify(_asistencias)} );
    this.router.navigateByUrl('/login');
    return estado;
  }

  async obtenerAsistenciasDeUsuario(  ){
    let {value} = await Preferences.get( {key: 'asistencias'} );
    const asistencias = JSON.parse(value!);
    ({value} = await Preferences.get( {key: 'sesion'} ))
    const sesion = JSON.parse(value!);
    const _asisPorUsuario = asistencias.filter( (asis:any) => asis.usuario === sesion.userActivo );
    return _asisPorUsuario;
  }
  async obtenerAsignaturaPorCodigo(codigo :string){
    const {value} = await Preferences.get( {key:'asignaturas' });
    const json = JSON.parse( value! );
    return json[codigo];
  }
}

// {"asignatura":"ENG4567","seccion":"001D","docente":"Carlos Fernández","sala":"Aula 205","fecha":"24-09-2023","hora":"10:45","leccion":"Inglés Avanzado"}