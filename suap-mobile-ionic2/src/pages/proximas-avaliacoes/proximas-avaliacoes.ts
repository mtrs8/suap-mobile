import { Component } from '@angular/core';
import { Platform, NavController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../app/auth.service';
import { AlunosService } from '../../app/alunos.service';
import { GoogleAnalytics  } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-proximas-avaliacoes',
  templateUrl: 'proximas-avaliacoes.html'
})
export class ProximasAvaliacoesPage {
  private proximas_avaliacoes = [];
  private loading;

  get proximas_avaliacoes_com_data_setada() {
    return this.proximas_avaliacoes.filter(item => item.data !== null);
  }

  constructor(
    private navCtrl: NavController, 
    private platform: Platform,
    private alunosService: AlunosService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private googleAnalytics: GoogleAnalytics
  ) {
    this.platform.ready().then(() => {
        this.googleAnalytics.trackView("Próximas Avaliações");
    });

    this.loading = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loading.present();

    this.alunosService.get_anos_proximas_avaliacoes().then(data => {
      this.proximas_avaliacoes = data;
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
