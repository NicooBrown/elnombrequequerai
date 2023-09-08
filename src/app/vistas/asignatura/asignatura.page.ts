import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { asignaturas, Ramo } from 'src/app/modelo/temporal';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage implements OnInit {
  paramAsignatura! : keyof typeof asignaturas;
  asignaturaCargada : Ramo | undefined;
  constructor( private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.paramAsignatura = this.activatedRoute.snapshot.params['idasignatura'];
    this.asignaturaCargada = asignaturas[this.paramAsignatura];
  }

}
