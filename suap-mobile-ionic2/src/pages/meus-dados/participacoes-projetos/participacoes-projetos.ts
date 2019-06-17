import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController } from 'ionic-angular';
import { LoginPage } from '../../login/login';
import { AuthService } from '../../../app/auth.service';
import { ServidoresService } from '../../../app/servidores.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-participacoes-projetos',
  templateUrl: 'participacoes-projetos.html'
})
export class ParticipacoesProjetosPage {
  private participacoes_extensao = [];
  private participacoes_pesquisa = [];
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
        this.googleAnalytics.trackView("Férias");
    });

    this.loading = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loading.present();

    this.servidoresService.get_participacoes_projetos().then(data => {
      this.participacoes_extensao = data.participacoes_extensao;
      this.participacoes_pesquisa = data.participacoes_pesquisa;
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
