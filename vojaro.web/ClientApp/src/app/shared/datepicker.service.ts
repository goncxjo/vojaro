import { Injectable } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DatepickerService {

  constructor() { }

  public getFormattedDate(date: Date | null): NgbDateStruct | null {
    if (date) {
      let formattedDate = new Date(date);
      return { year: formattedDate.getFullYear(), month: formattedDate.getMonth() + 1, day: formattedDate.getDate() };      
    } else {
      return null;
    }
  }

  public getDate(ngbdate: NgbDateStruct): Date | null {
    if (ngbdate) {
      let date = new Date(ngbdate.year, ngbdate.month - 1, ngbdate.day);
      return date;
    } else {
      return null;
    }
  }
}
