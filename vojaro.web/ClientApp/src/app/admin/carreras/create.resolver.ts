import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Carrera, CarrerasService } from 'src/app/api';

@Injectable()
export class CreateResolver implements Resolve<Observable<Carrera>> {
    constructor(
        private service: CarrerasService,
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.service.new();
    }
}
