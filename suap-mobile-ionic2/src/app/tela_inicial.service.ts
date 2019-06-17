import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SuapMobile } from './app.component';
import { AuthService } from './auth.service';

@Injectable()
export class TelaInicialService {
    constructor(private http: Http, private authService: AuthService) { }

    // get_banners_ativos(): Promise<Object[]> {
    //     let headers = new Headers({
    //         'Content-Type': 'application/json',
    //         'Authorization': 'JWT ' + this.authService.token
    //     });
    //     let options = new RequestOptions({ headers: headers, withCredentials: false });
    //
    //     return this.http.get(`${ SuapMobile.API_URL }api/v2/eventos/banners/ativos/`, options).toPromise().then(response => response.json());
    // }
};
