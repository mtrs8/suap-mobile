import { Component } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { DadosGeraisTurmaVirtualPage } from './dados-gerais';
import { ParticipantesTurmaVirtualPage } from './participantes';
import { AulasMinistradasTurmaVirtualPage } from './aulas-ministradas';
import { MateriaisDeAulaTurmaVirtualPage } from './materiais-de-aula';
import { LoginPage } from '../login/login';
import { AuthService } from '../../app/auth.service';
import { AlunosService } from '../../app/alunos.service';
import { GoogleAnalytics  } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-turma-virtual',
  templateUrl: 'turma-virtual.html'
})
export class TurmaVirtualPage {
  private id_turma_virtual;

  tabDadosGeraisTurmaVirtualPage = DadosGeraisTurmaVirtualPage;
  tabParticipantesTurmaVirtualPage = ParticipantesTurmaVirtualPage;
  tabAulasMinistradasTurmaVirtualPage = AulasMinistradasTurmaVirtualPage;
  tabMateriaisDeAulaTurmaVirtualPage = MateriaisDeAulaTurmaVirtualPage;

  constructor(
    public platform: Platform,
    private navCtrl: NavController,
    private navParams: NavParams,
    private alunosService: AlunosService,
    private authService: AuthService,
    private googleAnalytics: GoogleAnalytics
  ) {
    this.platform.ready().then(() => {
        this.googleAnalytics.trackView("Visualização de Turma Virtual");
    });

    this.id_turma_virtual = navParams.get("turma_virtual").id;
  }

  ionViewDidLoad() {
    this.authService.refresh_token().catch(error => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
    });
  }

  ionViewWillLeave() {
    this.alunosService.turma_virtual = {};
  }

}
