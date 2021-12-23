import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as datatableSpanish from 'src/assets/datatables/es_es.json';
import { PageSort, PagedData } from '../api';
import * as _ from 'lodash';

type ProviderCallback = (pageInfo: any, filters: any, columnSort: any) => Observable<PagedData<any>>;

@Injectable({
  providedIn: 'root'
})
export class AngularDatatablesHelper {
  getDefaultData(): PagedData<any> {
    throw new Error('Method not implemented.');
  }
  defaultTab: number = 1;

  options: DataTables.Settings = {
    pagingType: 'simple_numbers',
    processing: true,
    serverSide: true,
    pageLength: 10,
    order: [],
    language: datatableSpanish,
    dom: "<'row mb-2't><'row align-items-center mb-3'<'col text-align-left'li><'col'p>>",
    deferRender: true,
    deferLoading: 0,
  };

  constructor() { }

  getDefaultParams(): any {
    return {
      pageInfo: {
        pageNumber: 1,
        pageSize: 10
      },
      sort: []
    }
  }

  getDefaultPagedData(): any {
    return {
      total: null,
      data: [],
      recordsTotal: null,
      recordsFiltered: null,
      draw: null
    };
  }

  getTableInfo(params: any) {
    const start = parseInt(params.start);
    const length = parseInt(params.length);
    return {
      pageInfo: { pageNumber: start / length + 1, pageSize: length },
      sort: _.map(params['order'], (order) => this.buildPageSort(params['columns'], order))
    }
  }

  buildPageSort(columns: any, order: any): PageSort {
    return {
      name: columns[order.column].data,
      direction: order.dir
    }
  }

  getData(that: any, dataProvider: ProviderCallback, params: any, callback: any) {
    let tableInfo = this.getTableInfo(params);
    that.pageInfo = tableInfo.pageInfo;
    that.sort = tableInfo.sort;

    return dataProvider(that.pageInfo, that.filters, that.sort).subscribe(response => {
      that.page = response;
      return callback({
        data: [],
        total: response.total,
        recordsTotal: response.total,
        recordsFiltered: response.total
      });
    });
  }

}
