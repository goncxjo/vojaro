import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Asignatura, AsignaturasService } from 'src/app/api';

@Injectable()
export class GetByIdResolver implements Resolve<Observable<Asignatura>> {
    constructor(
        private service: AsignaturasService,
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.service.getById(route.paramMap.get('id') || '');
    }
}
