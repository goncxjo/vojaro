import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { BreadcrumbModule } from 'angular-crumbs';
import { AngularFormsInputMasksModule } from 'angular-forms-input-masks';
import { FileSaverModule } from 'ngx-filesaver';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown'


const MODULES = [
  CommonModule,
  NgbModule,
  FormsModule,
  ReactiveFormsModule,
  DataTablesModule,
  BreadcrumbModule,
  AngularFormsInputMasksModule,
  FileSaverModule,
  AngularMultiSelectModule 
]

const PRIVATE_COMPONENTS: any = [
];

const PUBLIC_COMPONENTS: any = [
];

@NgModule({
  declarations: [
    ...PRIVATE_COMPONENTS,
    ...PUBLIC_COMPONENTS,
  ],
  imports: MODULES,
  exports: [
    MODULES,
    ...PUBLIC_COMPONENTS
  ],
})
export class SharedModule { }
