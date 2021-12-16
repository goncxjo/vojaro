import { Component, Inject, OnInit } from '@angular/core';
import * as packageInfo from 'package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  actualYear: number = (new Date()).getFullYear();
  environmentName: string = '';
  appVersion: string = '';
  
  constructor(
    @Inject('ENVIRONMENT_NAME') environmentName: string,
    @Inject('APP_VERSION') appVersion: string
  ) {
    this.environmentName = environmentName;
    this.appVersion = appVersion;
  }

  ngOnInit(): void {
  }

  getFooterText() {
    return `VOJARO | ${this.actualYear} - VERSION: ${this.appVersion} - AMBIENTE: ${this.environmentName}`
  }

}
