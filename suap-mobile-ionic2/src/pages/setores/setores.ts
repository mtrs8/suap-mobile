import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../app/auth.service';
import { ServidoresService } from '../../app/servidores.service';
import { GoogleAnalytics  } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-setores',
  templateUrl: 'setores.html'
})
export class SetoresPage {
  private response;
  private params = {
    sigla: '',
    nome: '',
    uo: ''
  };
  private unidades_organizacionais = [];
  private setores = [];
  private loading;

  constructor(
    public platform: Platform,
    private navCtrl: NavController,
    private navParams: NavParams,
    private authService: AuthService,
    private servidoresService: ServidoresService,
    private loadingCtrl: LoadingController,
    private googleAnalytics: GoogleAnalytics
  ) {
    this.platform.ready().then(() => {
        this.googleAnalytics.trackView("Setores");
    });

    this.servidoresService.get_unidades_organizacionais().then(data => {
      this.unidades_organizacionais = data.results;
    });

    this.atualizar_setores();
  }

  atualizar_setores() {
    this.loading = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loading.present();

    this.servidoresService.get_setores(this.params).then(data => {
      this.response = data;
      this.setores = this.response.results;
      this.loading.dismiss();
    }).catch(error => {
      this.loading.dismiss();
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
      this.servidoresService.get_setores(this.params, this.response.next).then(data=>{
        this.response = data;

        for(let setor of this.response.results) {
          this.setores.push(setor);
        }

        infiniteScroll.enable(true);
        infiniteScroll.complete();
      });
    } else {
      infiniteScroll.enable(false);
    }
  }
}
