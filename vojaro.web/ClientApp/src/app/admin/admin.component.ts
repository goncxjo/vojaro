import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  MODULES = [
    {
      route: 'universidades',
      name: 'Universidades',
      icon: 'fa fa-file-alt fa-4x',
      disabled: false,
    },
    {
      route: 'carreras',
      name: 'Carreras',
      icon: 'fa fa-graduation-cap fa-4x',
      disabled: false,
    },
  ];

  constructor() { }

  ngOnInit() {}

  getModules(): any[] {
    return this.MODULES;
  }
}
