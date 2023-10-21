import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from 'capacitor-barcode-scanner';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';

@Component({
  selector: 'app-lector',
  templateUrl: './lector.page.html',
  styleUrls: ['./lector.page.scss'],
})
export class LectorPage implements OnInit {
  ERROR : string = "Si estás leyendo esto, es porque hubo un error.";

  constructor( private asis : AsistenciaService ) { }

  ngOnInit() {
    this.escanear();
  }

  async escanear(){
    let res : any = await BarcodeScanner.scan();
    try{
      if( !res ) return;
      const estado : any = await this.asis.guardarAsistencia( res.code );
      console.log(estado);
      if( !estado.exito ){
        this.ERROR = estado.razon;
      }
    }catch(error:any){
      this.ERROR = error;
    }
  }

}
