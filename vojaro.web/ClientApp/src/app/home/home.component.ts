import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  MODULES = [
    { route: "universidades", name: "Universidades", icon: "fa fa-file-alt fa-4x", disabled: false },
    { route: "carreras", name: "Carreras", icon: "fa fa-graduation-cap fa-4x", disabled: false },
    { route: "admin", name: "Administración", icon: "fa fa-cog fa-4x", disabled: true },
    { route: "security", name: "Seguridad", icon: "fa fa-user-shield fa-4x", disabled: true  },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
