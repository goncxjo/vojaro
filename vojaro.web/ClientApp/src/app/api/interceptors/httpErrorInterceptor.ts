import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared';

@Injectable({
    providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(
        private notificationService: NotificationService,
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError(error => {
                let errorMessage = this.getErrorMessage(error);

                console.error(errorMessage, error);
                this.notificationService.showDanger(errorMessage);
                return throwError(() => errorMessage);
            })
        );
    }

    private getErrorMessage(error: any): string {
        let result = error?.error?.message;
        return result ?? 'Ocurrió un error al procesar la solicitud';
    }
}
