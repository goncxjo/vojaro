import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Universidad, UniversidadFilters, PagedData, PageInfo } from '../models';
import { buildQueryParams } from '.';
import { PageSort } from '../models/page-sort';
import { FileSaverService } from 'ngx-filesaver';
import * as _ from 'lodash';
import { Departamento } from '../models/departamento';
import { Sede } from '../models/sede';

@Injectable({
  providedIn: 'root'
})
export class UniversidadesService {
  private baseRoute: string;

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_API_URL') baseUrl: string,
    private fileService: FileSaverService
  ) {
    this.baseRoute = baseUrl + '/universidades';
  }

  getPaged(pageInfo: PageInfo, filters: UniversidadFilters, columnSort: PageSort[]): Observable<PagedData<Universidad>> {
    const url = `${this.baseRoute}`;
    const sort = JSON.stringify(columnSort);
    
    const query = {
      ...pageInfo,
      sort,
      ...filters,
    };
    
    return this.httpClient.get<PagedData<Universidad>>(url, { params: buildQueryParams(query) });
  }
  
  getById(id: string): Observable<Universidad> {
    const url = `${this.baseRoute}/${id}`;
    return this.httpClient.get<Universidad>(url);
  }

  new(): Observable<Universidad> {
    return of({
      id: 0,
      siglas: '',
      nombre: '',
    });
  }
  
  save(entity: Universidad): Observable<Universidad> {
    if (entity.id) {
        return this.httpClient.put<Universidad>(this.baseRoute, entity);
    } else {
        return this.httpClient.post<Universidad>(this.baseRoute, entity);
    }
  }

  getPagedDepartamentos(pageInfo: PageInfo, filters: UniversidadFilters, columnSort: PageSort[]): Observable<PagedData<Departamento>> {
    const url = `${this.baseRoute}/departamentos`;
    const sort = JSON.stringify(columnSort);
    
    const query = {
      ...pageInfo,
      sort,
      ...filters,
    };
    
    return this.httpClient.get<PagedData<Departamento>>(url, { params: buildQueryParams(query) });
  }

  
  getDepartamentoById(id: string): Observable<Departamento> {
    const url = `${this.baseRoute}/departamentos/${id}`;
    return this.httpClient.get<Departamento>(url);
  }
  
  saveDepartamento(entity: Departamento): Observable<Departamento> {
    const url = `${this.baseRoute}/departamentos`;
    if (entity.id) {
        return this.httpClient.put<Departamento>(url, entity);
    } else {
        return this.httpClient.post<Departamento>(url, entity);
    }
  }

  newDepartamento(id: number): Observable<Departamento> {
    return of({
      id: 0,
      nombre: '',
      universidadId: id
    });
  }

  getPagedSedes(pageInfo: PageInfo, filters: UniversidadFilters, columnSort: PageSort[]): Observable<PagedData<Sede>> {
    const url = `${this.baseRoute}/sedes`;
    const sort = JSON.stringify(columnSort);
    
    const query = {
      ...pageInfo,
      sort,
      ...filters,
    };
    
    return this.httpClient.get<PagedData<Sede>>(url, { params: buildQueryParams(query) });
  }

  getSedeById(id: string): Observable<Sede> {
    const url = `${this.baseRoute}/sedes/${id}`;
    return this.httpClient.get<Sede>(url);
  }
  
  saveSede(entity: Sede): Observable<Sede> {
    const url = `${this.baseRoute}/sedes`;
    if (entity.id) {
        return this.httpClient.put<Sede>(url, entity);
    } else {
        return this.httpClient.post<Sede>(url, entity);
    }
  }

  newSede(id: number): Observable<Sede> {
    return of({
      id: 0,
      nombre: '',
      universidadId: id
    });
  }

}
