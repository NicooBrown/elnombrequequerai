import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { _asignaturas } from 'src/app/esquema/preferencias';

@Component({
  selector: 'app-depurar',
  templateUrl: './depurar.page.html',
  styleUrls: ['./depurar.page.scss'],
})
export class DepurarPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async borrarTodasLasPreferencias(){
    await Preferences.remove( {key:'metadataUsuarios'} );
    await Preferences.remove( {key:'asignaturas'} );
    await Preferences.remove( {key:'asistencias'} );
    await Preferences.remove( {key:'sesion'} );
  }

  async imprimirTodos(){
    let {value} = await Preferences.get({key: 'metadataUsuarios'});
    console.log(JSON.parse(value!));
    ( {value} = await Preferences.get({key: 'asignaturas'}));
    console.log(JSON.parse(value!));
    ( {value} = await Preferences.get({key: 'asistencias'}));
    console.log(JSON.parse(value!));
    ( {value} = await Preferences.get({key: 'sesion'}));
    console.log(JSON.parse(value!));
  }

  async resetearAsignatura(){
    await Preferences.set( {key: 'asignaturas', value: JSON.stringify(_asignaturas)} );
  }
  async resetearAsistencias(){
    await Preferences.set( {key: 'asistencias', value: JSON.stringify([])} );
  }
}
