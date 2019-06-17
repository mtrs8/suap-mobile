import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../../login/login';
import { AuthService } from '../../../app/auth.service';
import { ServidoresService } from '../../../app/servidores.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-ocorrencias-afastamentos',
  templateUrl: 'ocorrencias-afastamentos.html'
})
export class OcorrenciasAfastamentosPage {
  private ocorrencias;
  private afastamentos;
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
        this.googleAnalytics.trackView("Ocorrências/Afastamentos");
    });

    this.loading = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loading.present();

    this.servidoresService.get_ocorrencias_afastamentos().then(data => {
      this.ocorrencias = data.ocorrencias;
      this.afastamentos = data.afastamentos;
      this.loading.dismiss();
    }).catch(error => {
      this.loading.dismiss();
    });
  }

  ionViewDidLoad() {
    this.authService.refresh_token().catch(error => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
    });
  }
}
