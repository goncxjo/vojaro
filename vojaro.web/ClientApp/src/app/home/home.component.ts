import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  MODULES = [
    { route: "Planificar", name: "plan", icon: "fa fa-project-diagram fa-4x", disabled: true },
    { route: "admin", name: "Administración", icon: "fa fa-cog fa-4x", disabled: false },
    { route: "security", name: "Seguridad", icon: "fa fa-user-shield fa-4x", disabled: true  },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

