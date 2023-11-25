import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redireccionLogin = () => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'feed',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./vistas/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./vistas/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: 'feed',
    loadChildren: () => import('./vistas/feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: 'lector',
    loadChildren: () => import('./vistas/lector/lector.module').then( m => m.LectorPageModule)
  },
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: 'asistencia',
    loadChildren: () => import('./vistas/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
  {
    path: 'asignatura',
    redirectTo: 'feed',
    pathMatch: 'full'
  },
  {
    canActivate:[AngularFireAuthGuard], 
    data:{authGuardPipe: redireccionLogin},
    path: 'asignatura/:idasignatura',
    loadChildren: () => import('./vistas/asignatura/asignatura.module').then( m => m.AsignaturaPageModule)
  },
  {
    path: 'depurar',
    loadChildren: () => import('./debug/depurar/depurar.module').then( m => m.DepurarPageModule)
  },  {
    path: 'modal',
    loadChildren: () => import('./vistas/modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'clave',
    loadChildren: () => import('./vistas/clave/clave.module').then( m => m.ClavePageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
