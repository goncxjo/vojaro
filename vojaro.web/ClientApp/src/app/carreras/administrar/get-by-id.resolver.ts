import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Carrera } from 'src/app/api';
import { CarrerasService } from 'src/app/api/services/carreras.service';

@Injectable()
export class GetByIdResolver implements Resolve<Observable<Carrera>> {
    constructor(
        private service: CarrerasService,
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.service.getById(route.paramMap.get('id') || '');
    }
}
