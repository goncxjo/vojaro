import { Component, Input, OnInit } from '@angular/core';
import { Breadcrumb, BreadcrumbComponent } from 'angular-crumbs';

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss']
})
export class PageTitleComponent implements OnInit {
  @Input() title: string | null = null;
  @Input() breadcrumb: BreadcrumbComponent | null = null;

  constructor() { }

  ngOnInit(): void {}

}
