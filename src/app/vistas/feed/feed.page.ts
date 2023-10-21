import { Component, OnInit } from '@angular/core';
import { SesionService } from 'src/app/servicios/sesion.service';
import { ScreenOrientation } from '@capacitor/screen-orientation';
import { HelperService } from 'src/app/servicios/helper.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.page.html',
  styleUrls: ['./feed.page.scss'],
})
export class FeedPage implements OnInit {
  nombre : string = "pNombre";
  email : string = "mail";

  constructor(
    private sesion:SesionService,
    private help: HelperService
    ) { }

  ngOnInit() {
    this.mostrarDatos();
    this.evaluarOrientacion();
    this.help.showToast("Bienvenido!")
  }

  async evaluarOrientacion(){
    await ScreenOrientation.orientation().then((e:any)=>{
      if(e.type === 'landscape-primary'){
        this.help.showAlert("Tu pantalla no está en la orientación óptima para esta aplicación","Ojo!")
      }
    })
  }

  async mostrarDatos(){
    const datos = await this.sesion.obtenerDatosUsuario();
    console.log( datos );
    this.nombre = datos.nombre;
    this.email = datos.email;
  }

  logout = async() => this.sesion.deslogear();

}
