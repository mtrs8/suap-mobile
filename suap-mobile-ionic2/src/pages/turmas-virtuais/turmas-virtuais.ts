import { Component } from '@angular/core';
import { Platform, NavController, LoadingController } from 'ionic-angular';
import { TurmaVirtualPage } from '../turma-virtual/turma-virtual';
import { LoginPage } from '../login/login';
import { AlunosService } from '../../app/alunos.service';
import { AuthService } from '../../app/auth.service';
import { GoogleAnalytics  } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-turmas-virtuais',
  templateUrl: 'turmas-virtuais.html'
})
export class TurmasVirtuaisPage {
  private ano_periodo_selecionado = null;
  private anos_periodos_disponiveis = [];
  private turmas_virtuais = [];
  private loading;

  constructor(
    public platform: Platform,
    private navCtrl: NavController, 
    private alunosService: AlunosService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private googleAnalytics: GoogleAnalytics
  ) {
    this.platform.ready().then(() => {
        this.googleAnalytics.trackView("Turmas Virtuais");
    });

    this.alunosService.get_anos_periodos_disponiveis().then(data => {
      this.anos_periodos_disponiveis = data;
      this.ano_periodo_selecionado = this.anos_periodos_disponiveis[this.anos_periodos_disponiveis.length-1];
      this.atualizar_turmas_virtuais();
    });
  }

  ionViewDidLoad() {
    this.authService.refresh_token().catch(error => {
      this.navCtrl.setRoot(LoginPage);
    });
  }
  
  atualizar_turmas_virtuais() {
    this.loading = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loading.present();
    
    this.alunosService.get_turmas_virtuais(this.ano_periodo_selecionado.ano_letivo, this.ano_periodo_selecionado.periodo_letivo).then(data => {
      this.turmas_virtuais = data;
      this.loading.dismiss();
    }).catch(error => {
      this.loading.dismiss();
    });
  }

  abrirTurmaVirtualPage(turma_virtual) {
    this.navCtrl.push(TurmaVirtualPage, {"turma_virtual": turma_virtual});
  }
}
