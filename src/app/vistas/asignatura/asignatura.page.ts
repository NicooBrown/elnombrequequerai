import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { asignaturas, Ramo } from 'src/app/modelo/temporal';
import { AsistenciaService } from 'src/app/servicios/asistencia.service';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {
  paramAsignatura! : keyof typeof asignaturas;
  asignaturaCargada : any;
  constructor( private activatedRoute: ActivatedRoute , private asis : AsistenciaService) { }

  ngOnInit() {
    this.paramAsignatura = this.activatedRoute.snapshot.params['idasignatura'];
    this.cargarAsignatura (this.paramAsignatura);
  }
  async cargarAsignatura (codigo : string){
    this.asignaturaCargada = await this.asis.obtenerAsignaturaPorCodigo(codigo);
  }

}
