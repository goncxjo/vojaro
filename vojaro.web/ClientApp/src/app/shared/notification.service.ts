import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    constructor(
        private toastr: ToastrService
    ) {
    }

    showInfo(message: string, title: string = '') {
        this.toastr.info(message, title);
    }

    showSuccess(message: string, title: string = '') {
        this.toastr.success(message, title);
    }

    showWarning(message: string, title: string = '') {
        this.toastr.warning(message, title);
    }

    showDanger(message: string, title: string = '') {
        this.toastr.error(message, title);
    }
}
