import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { Universidad, UniversidadesService } from '../../api';

@Injectable()
export class CreateResolver implements Resolve<Observable<Universidad>> {
    constructor(
        private service: UniversidadesService,
    ) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.service.new();
    }
}
