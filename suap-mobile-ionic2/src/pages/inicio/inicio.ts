import { Component } from '@angular/core';
import { Platform, NavController, LoadingController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AuthService } from '../../app/auth.service';
import { TelaInicialService } from '../../app/tela_inicial.service';
import { ServidoresService } from '../../app/servidores.service';
import { LoginPage } from '../login/login';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html'
})
export class InicioPage {
  private banners;
  private frequencias;
  private loading;

  constructor(
    public platform: Platform,
    private navCtrl: NavController,
    private authService: AuthService,
    private servidoresService: ServidoresService,
    private telaInicialService: TelaInicialService,
    private inAppBrowser: InAppBrowser,
    private loadingCtrl: LoadingController,
    private googleAnalytics: GoogleAnalytics
  ) {
    this.platform.ready().then(() => {
        this.googleAnalytics.trackView("Início");
    });

    // Recuperando os dados do usuário logado.
    this.authService.get_dados_usuario_logado().then(() => {
      if (this.authService.usuario_logado.tipo_vinculo == 'Servidor') {
        this.servidoresService.get_frequencias_hoje().then(data => {
          this.frequencias = data;
        }).catch(error => {
          console.error(error);
        });
      }
    });
  }

  ionViewDidLoad() {
    this.authService.refresh_token().catch(error => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
    });

    // this.telaInicialService.get_banners_ativos().then(banners => {
    //   this.banners = banners;
  //  });
  }

  launchUrl(url) {
    this.platform.ready().then(() => {
      this.inAppBrowser.create(url, '_system');
    });
  }
}
