import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
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
    path: 'feed',
    loadChildren: () => import('./vistas/feed/feed.module').then( m => m.FeedPageModule)
  },
  {
    path: 'lector',
    loadChildren: () => import('./vistas/lector/lector.module').then( m => m.LectorPageModule)
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./vistas/asistencia/asistencia.module').then( m => m.AsistenciaPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
