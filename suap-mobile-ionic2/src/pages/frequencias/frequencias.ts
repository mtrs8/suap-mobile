import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../app/auth.service';
import { ServidoresService } from '../../app/servidores.service';
import { DatePipe } from '@angular/common';
import { GoogleAnalytics  } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-frequencias',
  templateUrl: 'frequencias.html'
})
export class FrequenciasPage {
  private data_inicio;
  private data_termino;
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
        this.googleAnalytics.trackView("Frequências");
    });

    let hoje = new Date().toISOString();
    this.data_inicio = hoje;
    this.data_termino = hoje;
  }

  get_frequencias() {
    return null;
  }

  ionViewDidLoad() {
    this.authService.refresh_token().catch(error => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
    });
  }

}
