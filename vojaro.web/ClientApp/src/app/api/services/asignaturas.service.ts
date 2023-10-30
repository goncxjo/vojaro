import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Asignatura, AsignaturaFilters, PagedData, PageInfo } from '../models';
import { buildQueryParams } from '.';
import { PageSort } from '../models/page-sort';
import { FileSaverService } from 'ngx-filesaver';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {
  private baseRoute: string;

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_API_URL') baseUrl: string,
    private fileService: FileSaverService
  ) {
    this.baseRoute = baseUrl + '/asignaturas';
  }

  getPaged(pageInfo: PageInfo, filters: AsignaturaFilters, columnSort: PageSort[]): Observable<PagedData<Asignatura>> {
    const url = `${this.baseRoute}`;
    const sort = JSON.stringify(columnSort);
    
    const query = {
      ...pageInfo,
      sort,
      ...filters,
    };
    
    return this.httpClient.get<PagedData<Asignatura>>(url, { params: buildQueryParams(query) });
  }
  
  getById(id: string): Observable<Asignatura> {
    const url = `${this.baseRoute}/${id}`;
    return this.httpClient.get<Asignatura>(url);
  }

  new(): Observable<Asignatura> {
    return of({
      id: 0,
      codigo: '',
      nombre: '',
      anio: 0,
      cuatrimestre: 0,
      cargaHoraria: 0,
      creditos: 0,
      esInterdisciplinaria: false,
      correlativas: null,
      universidad: null,
      carrera: null,
      carreraOrientacion: null,
      correlativasId: null,
      universidadId: 0,
      carreraId: 0,
      carreraOrientacionId: null,
    });
  }
  
  save(entity: Asignatura): Observable<Asignatura> {
    if (entity.id) {
        return this.httpClient.put<Asignatura>(this.baseRoute, entity);
    } else {
        return this.httpClient.post<Asignatura>(this.baseRoute, entity);
    }
  }

  getCorrelativas(id: number): Observable<Asignatura[]> {
    const url = `${this.baseRoute}/${id}/correlativas`;    
    return this.httpClient.get<Asignatura[]>(url);
  }

  getPagedCorrelativasDisponibles(pageInfo: PageInfo, filters: AsignaturaFilters, columnSort: PageSort[]): Observable<PagedData<Asignatura>> {
    const url = `${this.baseRoute}/correlativas/disponibles`;
    const sort = JSON.stringify(columnSort);
    
    const query = {
      ...pageInfo,
      sort,
      ...filters,
    };
    
    return this.httpClient.get<PagedData<Asignatura>>(url, { params: buildQueryParams(query) });
  }

  actualizarCorrelativas(id: number, correlativas: any[]): Observable<boolean> {
    const url = `${this.baseRoute}/correlativas/actualizar`;
    return this.httpClient.post<boolean>(url, { id, correlativas });
  }
}
