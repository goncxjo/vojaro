import { HttpParams } from '@angular/common/http';

export function buildQueryParams(query: any) {
    let params: HttpParams = new HttpParams();
    for (const key of Object.keys(query)) {
        if (query[key]) {
            if (query[key] instanceof Array) {
                query[key].forEach((item: any) => {
                    params = params.append(key.toString(), item);
                });
            } else if (query[key] instanceof Date) {
                params = params.append(key.toString(), query[key].toISOString());
            } else if (query[key].id) {
                params = params.append(key.toString(), query[key].id);
            } else {
                params = params.append(key.toString(), query[key]);
            }
        }
    }
    return params;
}
