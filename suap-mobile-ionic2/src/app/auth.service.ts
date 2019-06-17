import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { SuapMobile } from './app.component';

@Injectable()
export class AuthService {
    public token = localStorage.getItem('token');
    
    constructor(private http: Http) { }

    get autenticado() {
        return this.token !== null;
    } 
    
    get usuario_logado() {
        if (localStorage.getItem('usuario_logado') === null) {
            return {}
        } else {
            return JSON.parse(localStorage.getItem('usuario_logado'));
        }
    }

    is_acesso_responsavel(): boolean {
        return localStorage.getItem('acesso_responsavel') == 'true';
    }

    refresh_token(): Promise<void> {
        const json = JSON.stringify({
            token: this.token
        });

        let headers = new Headers({
            'Content-Type': 'application/json',
        });

        let options = new RequestOptions({ headers: headers, withCredentials: false });
        return this.http.post(`${ SuapMobile.API_URL }api/v2/autenticacao/token/refresh/`, json, options).toPromise().then(response => {
            // Atualizando o token do usuário.
            this.token = response.json().token;
            localStorage.setItem('token', this.token);
            return response.json();
        });
    }

    autenticar(usuario: string, senha: string): Promise<void> {
        const json = JSON.stringify({
            username: usuario,
            password: senha
        });

        let headers = new Headers({
            'Content-Type': 'application/json',
        });

        let options = new RequestOptions({ headers: headers, withCredentials: false });
        
        return this.http.post(`${ SuapMobile.API_URL }api/v2/autenticacao/token/`, json, options).toPromise().then(response => {
            this.token = response.json().token;
            localStorage.setItem('token', this.token);

            return response.json();
        });
    }

    autenticar_acesso_responsavel(matricula: string, chave: string): Promise<void> {
        const json = JSON.stringify({
            matricula: matricula,
            chave: chave
        });

        let headers = new Headers({
            'Content-Type': 'application/json',
        });

        let options = new RequestOptions({ headers: headers, withCredentials: false });
        
        return this.http.post(`${ SuapMobile.API_URL }api/v2/autenticacao/acesso_responsaveis/`, json, options).toPromise().then(response => {
            this.token = response.json().token;
            localStorage.setItem('token', this.token);
            localStorage.setItem('acesso_responsavel', 'true');

            return response.json();
        });
    }

    get_dados_usuario_logado(): Promise<void> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'JWT ' + this.token
        });
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return this.http.get(`${ SuapMobile.API_URL }api/v2/minhas-informacoes/meus-dados/`, options).toPromise().then(response => {
            localStorage.setItem('usuario_logado', JSON.stringify(response.json()));
            return response.json()
        });
    }
};