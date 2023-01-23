import { HttpClient, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Carrera, CarreraFilters, PagedData, PageInfo } from '../models';
import { buildQueryParams } from '.';
import { PageSort } from '../models/page-sort';
import { FileSaverService } from 'ngx-filesaver';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CarrerasService {
  private baseRoute: string;

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_API_URL') baseUrl: string,
    private fileService: FileSaverService
  ) {
    this.baseRoute = baseUrl + '/carreras';
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
      duracion: 0,
      nivel: 0,
    });
  }
  
  save(entity: Carrera): Observable<Carrera> {
    if (entity.id) {
        return this.httpClient.put<Carrera>(this.baseRoute, entity);
    } else {
        return this.httpClient.post<Carrera>(this.baseRoute, entity);
    }
  }
}
