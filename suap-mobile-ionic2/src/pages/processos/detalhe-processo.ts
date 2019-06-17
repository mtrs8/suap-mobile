import { Component } from '@angular/core';
import { Platform, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DetalheTramiteModal } from './modal-tramite';
import { AuthService } from '../../app/auth.service';
import { ServidoresService } from '../../app/servidores.service';
import { GoogleAnalytics  } from '@ionic-native/google-analytics';

@Component({
  selector: 'page-processos',
  templateUrl: 'detalhe-processo.html'
})
export class DetalheProcessoPage {
  private processo;
  private loading;

  constructor(
    public platform: Platform,
    private navCtrl: NavController,
    private navParams: NavParams,
    private authService: AuthService,
    private servidoresService: ServidoresService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private googleAnalytics: GoogleAnalytics
  ) {
    this.platform.ready().then(() => {
        this.googleAnalytics.trackView("Detalhamento de Processos");
    });
    
    this.loading = this.loadingCtrl.create({
      content: "Carregando...",
    });
    this.loading.present();

    this.servidoresService.get_processo(navParams.get('id')).then(data => {
      this.processo = data;
      this.loading.dismiss();
    }).catch(error => {
      this.loading.dismiss();
    });;
  }

  verDetalheTramite(tramite) {
   let tramiteModal = this.modalCtrl.create(DetalheTramiteModal, {tramite: tramite});
   tramiteModal.present();
 }

  ionViewDidLoad() {
    this.authService.refresh_token().catch(error => {
      localStorage.clear();
      this.navCtrl.setRoot(LoginPage);
    });
  }
}