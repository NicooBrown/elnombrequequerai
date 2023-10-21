import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { Comuna , Region } from 'src/app/esquema/local';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) { }

  async cargarRegiones(){
    return await lastValueFrom(this.http.get<ApiResponse<Region>>(`${environment.apiUrl}region`));
  }
  async cargarComunas(id_reg: number){
    return await lastValueFrom( this.http.get<ApiResponse<Comuna>>(`${environment.apiUrl}comuna/` + id_reg) )
  }
  
}
export class ApiResponse<type>{
  msg:string = '';
  data:type[] = [];
  success:boolean = false;
  isFailed:boolean = false;
}