import { ElementRef, Component, OnInit, ViewChild } from '@angular/core';
import { AnimationController, IonCard } from '@ionic/angular';
import type {Animation} from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  private animation! : Animation;
  @ViewChild(IonCard, {read: ElementRef})
  card! : ElementRef<HTMLIonCardElement>;

  cargando : boolean = true; 

  constructor(private animationCtrl: AnimationController) { }

  ngOnInit() {
    setTimeout(() => {
      this.cargando = false;
      
    }, 2000);
  }
  ionViewDidEnter(){
    this.animation = this.animationCtrl.create()
    .addElement(document.querySelectorAll('ion-card[hoy]'))
    .duration(1500)
    .iterations(Infinity)
    .keyframes([
      {border: '1px solid #84a8ff75', borderBottom: '3px solid #84a8ff75', offset: 0},
      {border: '1px solid transparent', borderBottom: '3px solid transparent', offset: .5},
      {border: '1px solid #84a8ff75', borderBottom: '3px solid #84a8ff75', offset: 1}
    ]);
    this.animation.play();
  }
  ionViewDidLeave(){
    this.animation.stop();
  }

}
