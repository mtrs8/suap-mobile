import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../app/auth.service';
import { AlunosService } from '../../app/alunos.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-dados-gerais-turma-virtual',
  templateUrl: 'dados-gerais.html'
})
export class DadosGeraisTurmaVirtualPage {
  private turma_virtual = {};
  private loading;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private alunosService: AlunosService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private platform: Platform,
    private googleAnalytics: GoogleAnalytics
  ) {
    this.platform.ready().then(() => {
        this.googleAnalytics.trackView("Visualização das Aulas Ministradas em uma Turma Virtual");
    });

    this.loading = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loading.present();

    this.alunosService.get_turma_virtual(navParams.data).then(data => {
      this.turma_virtual = data;
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
