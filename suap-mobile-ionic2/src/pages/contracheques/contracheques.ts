import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DetalheContrachequePage } from './detalhe-contracheque';
import { AuthService } from '../../app/auth.service';
import { ServidoresService } from '../../app/servidores.service';
import { GoogleAnalytics  } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-contracheques',
  templateUrl: 'contracheques.html'
})
export class ContrachequesPage {
  private contracheques;
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
        this.googleAnalytics.trackView("Contracheques");
    });
    
    this.loading = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loading.present();

    this.servidoresService.get_meses_contracheques().then(data => {
      this.contracheques = data;
      this.loading.dismiss();
    }).catch(error => {
      this.loading.dismiss();
    });
  }

  visualizar_contracheque(contracheque) {
    this.navCtrl.push(DetalheContrachequePage, {ano: contracheque.ano, mes: contracheque.mes})
  }

  ionViewDidLoad() {
    this.authService.refresh_token().catch(error => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
    });
  }

}
