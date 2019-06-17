import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, ItemSliding } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { AuthService } from '../../app/auth.service';
import { ServidoresService } from '../../app/servidores.service';
import { DetalheProcessoPage } from './detalhe-processo';

@Component({
  selector: 'page-processos',
  templateUrl: 'processos.html'
})
export class ProcessosPage {
  private response;
  private params = {
    interessado: '',
    assunto: '',
    situacao: '',
    uo: ''
  };
  private filtro_processos = "todos";
  private unidades_organizacionais = [];
  private processos = [];
  private processos_favoritos = [];
  private loading;

  constructor(
    public platform: Platform,
    private navCtrl: NavController,
    private navParams: NavParams,
    private authService: AuthService,
    private servidoresService: ServidoresService,
    private loadingCtrl: LoadingController,
    private googleAnalytics: GoogleAnalytics,
    private storage: Storage
  ) {
    this.platform.ready().then(() => {
        this.googleAnalytics.trackView("Processos");
    });

    this.servidoresService.get_unidades_organizacionais().then(data => {
      this.unidades_organizacionais = data.results;
    });

    this.atualizar_processos();
  }

  visualizar_processo(processo) {
    this.navCtrl.push(DetalheProcessoPage, {id: processo.id})
  }

  favoritar_processo(processo) {
    this.processos_favoritos.push(processo.id);
    this.storage.set('processos_favoritos', this.processos_favoritos);
  }

  desfavoritar_processo(processo) {
    var index = this.processos_favoritos.indexOf(processo.id, 0);
    if (index > -1) {
      this.processos_favoritos.splice(index, 1);
    }
    this.storage.set('processos_favoritos', this.processos_favoritos);
  }

  atualizar_processos() {
    this.loading = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loading.present();

    this.servidoresService.get_processos(this.params).then(data => {
      this.response = data;
      this.processos = this.response.results;
      this.loading.dismiss();
    }).catch(error => {
      this.loading.dismiss();
    });

    this.storage.get('processos_favoritos').then((val) => {
      if (val !== null) {
        this.processos_favoritos = val;
      }
    });
  };

  ionViewDidLoad() {
    this.authService.refresh_token().catch(error => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
    });
  }

  doInfinite(infiniteScroll:any) {
    if(this.response.next !== null) {
      this.servidoresService.get_processos(this.params, this.response.next).then(data=>{
        this.response = data;

        for(let item of this.response.results) {
          this.processos.push(item);
        }

        infiniteScroll.enable(true);
        infiniteScroll.complete();
      });
    } else {
      infiniteScroll.enable(false);
    }
  }
}
