import { Injectable, QueryList } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as datatableSpanish from 'src/assets/datatables/es_es.json';
import { PagedData, PageInfo, PageSort } from '../api';
import * as _ from 'lodash';
import { DataTableDirective } from 'angular-datatables';

type ProviderCallback = (pageInfo: any, filters: any, columnSort: any) => Observable<PagedData<any>>;
type ProviderPostCallback = (param: any) => Observable<PagedData<any>>;

@Injectable({
  providedIn: 'root'
})
export class AngularDatatablesHelper {
  defaultTab: number = 1;

  options: DataTables.Settings = {
    pagingType: 'simple_numbers',
    processing: true,
    serverSide: true,
    pageLength: 10,
    order: [],
    language: datatableSpanish,
    dom: "<'row mb-2't><'row align-items-center'<'col text-align-left'li><'col'p>>",
    deferRender: true,
    deferLoading: 0,
  };

  optionsServerless: DataTables.Settings = {
    pagingType: 'simple_numbers',
    pageLength: 10,
    language: datatableSpanish,
    dom: "<'row mb-2't><'row align-items-center'<'col text-align-left'li><'col'p>>",
  };

  optionsServerlessWithoutPagination: DataTables.Settings = {
    paging: false,
    language: datatableSpanish,
    dom: "<'row mb-2't>",
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
  getDefaultPageInfoServerless(): PageInfo {
    return {
        pageNumber: 1,
        pageSize: 99999
    }
  }

  getDefaultPagedData(): any {
    return {
      total: 0,
      data: [],
      recordsTotal: 0,
      recordsFiltered: 0,
      draw: 0
    };
  }

  getTableInfo(params: any) {
    const start = parseInt(params.start);
    const length = parseInt(params.length);
    return {
      pageInfo: { pageNumber: start / length + 1, pageSize: length },
      sort: _.map(params['order'], (order) => this.buildColumnSort(params['columns'], order))
    }
  }

  buildColumnSort(columns: any, order: any): PageSort {
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

  postData(that: any, dataProvider: ProviderPostCallback, params: any, callback: any) {
    return dataProvider(params).subscribe(response => {
      that.page = response;
      return callback({
        data: [],
        total: response.total,
        recordsTotal: response.total,
        recordsFiltered: response.total
      });
    });
  }

  reload(dtElement: DataTableDirective, callback?: ((...args: any[]) => void) | void | undefined) {
    dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if(dtInstance) {
        dtInstance.ajax.reload();
        if (callback) {
          callback();
        }
      }
    });
  }

  draw(dtElement: DataTableDirective, callback?: ((...args: any[]) => void) | void | undefined) {
    dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if(dtInstance) {
        dtInstance.draw();
        if (callback) {
          callback();
        }
      }
    });
  }

  rerender(dtElement: DataTableDirective, dtTrigger: Subject<any>): void {
    dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      if(dtInstance) {
        dtInstance.clear().draw();
        dtInstance.destroy();      
        dtTrigger.next(null); 
      }
    });
  }

  reloadByIndex(dtElements: QueryList<DataTableDirective>, index: number, callback?: ((...args: any[]) => void) | void | undefined) {
    this.reload(dtElements.get(index)!, callback);
  }

  drawByIndex(dtElements: QueryList<DataTableDirective>, index: number, callback?: ((...args: any[]) => void) | void | undefined) {
    this.draw(dtElements.get(index)!, callback);
  }

  rerenderByIndex(dtElements: QueryList<DataTableDirective>, index: number, dtTrigger: Subject<any>) {
    this.rerender(dtElements.get(index)!, dtTrigger);
  }
}
