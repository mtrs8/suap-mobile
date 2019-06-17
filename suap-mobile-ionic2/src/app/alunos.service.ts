import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SuapMobile } from './app.component';
import { AuthService } from './auth.service';

@Injectable()
export class AlunosService {
    public turma_virtual = {};
    constructor(private http: Http, private authService: AuthService) { }

    get_anos_periodos_disponiveis(): Promise<Object[]> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/meus-periodos-letivos/`, options).toPromise().then(response => response.json());
    }

    get_turmas_virtuais(ano_letivo, periodo_letivo): Promise<Object[]> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/turmas-virtuais/${ ano_letivo }/${ periodo_letivo }/`, options).toPromise().then(response => response.json());
    }

    get_turma_virtual(id): Promise<Object[]> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });
        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/turma-virtual/${ id }/`, options).toPromise().then(response => {
            this.turma_virtual = response.json();
            return response.json();
        });
    }

    get_boletim(ano_letivo, periodo_letivo): Promise<Object[]> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/boletim/${ ano_letivo }/${ periodo_letivo }/`, options).toPromise().then(response => response.json());
    }

    get_anos_proximas_avaliacoes(): Promise<Object[]> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/proximas-avaliacoes/`, options).toPromise().then(response => response.json());
    }
};