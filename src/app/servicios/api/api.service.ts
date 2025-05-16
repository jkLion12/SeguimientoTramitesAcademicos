import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstudianteI } from '../../modelos/estudiante.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:80/API UNAMBA/'; // url de la api

  constructor(private http: HttpClient) { }

  getEstudiante(codigo: string): Observable<EstudianteI> {
    const direccion = `${this.url}estudiante?codigo=${codigo}`;
    return this.http.get<EstudianteI>(direccion);
  }
}
