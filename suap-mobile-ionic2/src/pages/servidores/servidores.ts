import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../app/auth.service';
import { ServidoresService } from '../../app/servidores.service';
import { GoogleAnalytics  } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-servidores',
  templateUrl: 'servidores.html'
})
export class ServidoresPage {
  private response;
  private params = {
    nome: '',
    uo: ''
  };
  private unidades_organizacionais = [];
  private servidores = [];
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
        this.googleAnalytics.trackView("Servidores");
    });

    this.servidoresService.get_unidades_organizacionais().then(data => {
      this.unidades_organizacionais = data.results;
    });
    
    this.atualizar_servidores();
  }

  atualizar_servidores() {
    this.loading = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loading.present();

    this.servidoresService.get_servidores(this.params).then(data => {
      this.response = data;
      this.servidores = this.response.results;
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
    if (this.response.next) {
      this.servidoresService.get_servidores(this.params, this.response.next).then(data=>{
        this.response = data;

        for(let setor of this.response.results) {
          this.servidores.push(setor);
        }

        infiniteScroll.enable(true);
        infiniteScroll.complete();
      });
    } else {
      infiniteScroll.enable(false);
    }
  }
}
