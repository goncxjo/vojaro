import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Carrera, CarreraFilters, CarreraOrientacion, PagedData, PageInfo } from '../models';
import { buildQueryParams } from '.';
import { PageSort } from '../models/page-sort';
import { FileSaverService } from 'ngx-filesaver';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  private baseRoute: string;
  private baseCarreraOrientacionRoute: string;

  constructor(
    @Inject('BASE_API_URL') baseUrl: string,
    private httpClient: HttpClient,
    private fileService: FileSaverService
  ) {
    this.baseRoute = baseUrl + '/carreras';
    this.baseCarreraOrientacionRoute = this.baseRoute + '/orientaciones';
  }

  getPaged(pageInfo: PageInfo, filters: CarreraFilters, columnSort: PageSort[]): Observable<PagedData<Carrera>> {
    const url = `${this.baseRoute}`;
    const sort = JSON.stringify(columnSort);
    
    const query = {
      ...pageInfo,
      sort,
      ...filters,
    };
    
    return this.httpClient.get<PagedData<Carrera>>(url, { params: buildQueryParams(query) });
  }
  
  getById(id: string): Observable<Carrera> {
    const url = `${this.baseRoute}/${id}`;
    return this.httpClient.get<Carrera>(url);
  }

  new(): Observable<Carrera> {
    return of({
      id: 0,
      nombre: '',
      universidad: null,
      departamento: null,
      universidadId: 0,
      departamentoId: 0,
    });
  }
  
  save(entity: Carrera): Observable<Carrera> {
    if (entity.id) {
        return this.httpClient.put<Carrera>(this.baseRoute, entity);
    } else {
        return this.httpClient.post<Carrera>(this.baseRoute, entity);
    }
  }


  getPagedOrientaciones(pageInfo: PageInfo, filters: CarreraFilters, columnSort: PageSort[]): Observable<PagedData<CarreraOrientacion>> {
    const url = this.baseCarreraOrientacionRoute;
    const sort = JSON.stringify(columnSort);
    
    const query = {
      ...pageInfo,
      sort,
      ...filters,
    };
    
    return this.httpClient.get<PagedData<CarreraOrientacion>>(url, { params: buildQueryParams(query) });
  }

  getOrientacionById(id: string): Observable<CarreraOrientacion> {
    const url = `${this.baseCarreraOrientacionRoute}/${id}`;
    return this.httpClient.get<CarreraOrientacion>(url);
  }
  
  saveOrientacion(entity: CarreraOrientacion): Observable<CarreraOrientacion> {
    const url = this.baseCarreraOrientacionRoute;
    if (entity.id) {
        return this.httpClient.put<CarreraOrientacion>(url, entity);
    } else {
        return this.httpClient.post<CarreraOrientacion>(url, entity);
    }
  }

  getAllMiniOrientaciones(universidadId: number | null): Observable<CarreraOrientacion[]> {
    const url = `${this.baseCarreraOrientacionRoute}/mini-list`;
    const query = { universidadId };
        
    return this.httpClient.get<CarreraOrientacion[]>(url, { params: buildQueryParams(query) });
  }

  newOrientacion(id: number): Observable<CarreraOrientacion> {
    return of({
      id: 0,
      nombre: '',
      carrera: null,
      carreraId: id
    });
  }
}
