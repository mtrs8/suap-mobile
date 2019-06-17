import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { AuthService } from './auth.service';
import { SuapMobile } from './app.component';

@Injectable()
export class ServidoresService {
    constructor(private http: Http, private authService: AuthService) { }

    get_frequencias_hoje(): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/minhas-frequencias/`, options).toPromise().then(response => response.json());
    }

    get_meses_contracheques(): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/contracheques/`, options).toPromise().then(response => response.json());
    }

    get_contracheque(ano, mes): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/contracheques/${ano}/${mes}/`, options).toPromise().then(response => response.json());
    }

    get_unidades_organizacionais(): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/rh/unidades-organizacionais/`, options).toPromise().then(response => response.json());
    }

    get_servidores(params, next_page_url = null): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        
        let search_params = new URLSearchParams();
        search_params.set('limit', '20');
        search_params.set('nome__icontains', params.nome);
        search_params.set('setor__uo__sigla', params.uo);
        let options = new RequestOptions({ headers: headers, withCredentials: false, search: search_params });

        if (!next_page_url)
            return this.http.get(`${ SuapMobile.API_URL }api/v2/rh/servidores/?limit=20`, options).toPromise().then(response => response.json());
        else
            return this.http.get(`${ next_page_url }`, options).toPromise().then(response => response.json());
    }
    
    get_setores(params, next_page_url = null): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        
        let search_params = new URLSearchParams();
        search_params.set('limit', '20');
        search_params.set('nome__icontains', params.nome);
        search_params.set('sigla__icontains', params.sigla);
        search_params.set('uo__sigla', params.uo);
        let options = new RequestOptions({ headers: headers, withCredentials: false, search: search_params });

        if (!next_page_url)
            return this.http.get(`${ SuapMobile.API_URL }api/v2/rh/setores/`, options).toPromise().then(response => response.json());
        else
            return this.http.get(`${ next_page_url }`, options).toPromise().then(response => response.json());
    }

    get_processos(params, next_page_url = null): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        
        let search_params = new URLSearchParams();
        search_params.set('limit', '20');
        search_params.set('pessoa_interessada__nome__icontains', params.pessoa_interessada);
        search_params.set('assunto__icontains', params.assunto);
        search_params.set('status__exact', params.situacao);
        search_params.set('uo__sigla', params.uo);
        let options = new RequestOptions({ headers: headers, withCredentials: false, search: search_params });

        if (!next_page_url)
            return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/meus-processos/`, options).toPromise().then(response => response.json());
        else
            return this.http.get(`${ next_page_url }`, options).toPromise().then(response => response.json());
    }

    get_processo(id): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/meus-processos/${id}/`, options).toPromise().then(response => response.json());
    }

    get_historico_funcional(): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/meu-historico-funcional/`, options).toPromise().then(response => response.json());
    }

    get_ferias(): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/minhas-ferias/`, options).toPromise().then(response => response.json());
    }

    get_ocorrencias_afastamentos(): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/ocorrencias-afastamentos/`, options).toPromise().then(response => response.json());
    }

    get_participacoes_projetos(): Promise<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.authService.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/participacoes-projetos/`, options).toPromise().then(response => response.json());
    }
};