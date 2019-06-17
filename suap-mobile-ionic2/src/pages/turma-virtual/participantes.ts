import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../app/auth.service';
import { AlunosService } from '../../app/alunos.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-participantes-turma-virtual',
  templateUrl: 'participantes.html'
})
export class ParticipantesTurmaVirtualPage {
  private turma_virtual = {};
  
  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private alunosService: AlunosService,
    private authService: AuthService,
    private googleAnalytics: GoogleAnalytics
  ) {
    this.platform.ready().then(() => {
        this.googleAnalytics.trackView("Visualização de Participantes da Turma Virtual");
    });

    this.turma_virtual = this.alunosService.turma_virtual;
  }

  ionViewDidLoad() {
    this.authService.refresh_token().catch(error => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
    });
  }

}
