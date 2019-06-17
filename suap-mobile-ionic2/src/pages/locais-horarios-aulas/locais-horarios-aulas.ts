import { Component } from '@angular/core';
import { Platform, NavController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../app/auth.service';
import { AlunosService } from '../../app/alunos.service';
import { GoogleAnalytics  } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-locais-horarios-aulas',
  templateUrl: 'locais-horarios-aulas.html'
})
export class LocaisHorariosAulasPage {
  private ano_periodo_selecionado = null;
  private anos_periodos_disponiveis = [];
  private diarios = [];
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
        this.googleAnalytics.trackView("Locais e Horários de Aula");
    });

    this.alunosService.get_anos_periodos_disponiveis().then(data => {
      this.anos_periodos_disponiveis = data;
      this.ano_periodo_selecionado = this.anos_periodos_disponiveis[this.anos_periodos_disponiveis.length-1];
      this.atualizar_diarios();
    });
  }

  ionViewDidLoad() {
    this.authService.refresh_token().catch(error => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
    });
  }
  
  atualizar_diarios() {
    this.loading = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loading.present();

    this.alunosService.get_turmas_virtuais(this.ano_periodo_selecionado.ano_letivo, this.ano_periodo_selecionado.periodo_letivo).then(data => {
      this.diarios = data;
      this.loading.dismiss();
    }).catch(error => {
      this.loading.dismiss();
    });
  }

}
