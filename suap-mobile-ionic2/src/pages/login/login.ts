import { Component } from '@angular/core';
import { Platform, NavController, ToastController, MenuController } from 'ionic-angular';
import { InicioPage } from '../inicio/inicio';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { GoogleAnalytics  } from '@ionic-native/google-analytics';
import { AuthService } from '../../app/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private usuario = '';
  private senha = '';
  private acesso_responsavel = false;

  constructor(
    private navCtrl: NavController, 
    private menuCtrl: MenuController,
    private platform: Platform, 
    private authService: AuthService,
    private toastCtrl: ToastController,
    private inAppBrowser: InAppBrowser,
    private googleAnalytics: GoogleAnalytics
  ) {
    this.platform = platform;

    this.platform.ready().then(() => {
        this.googleAnalytics.trackView("Login");
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(true);
  }

  acessar() {
    if (!this.acesso_responsavel) {
      this.authService.autenticar(
        this.usuario, 
        this.senha
      ).then(
        () => this.navCtrl.setRoot(InicioPage)
      ).catch(
        error => {
          if (error.status == 0) {
            this.toastCtrl.create({
              message: "Atenção: Não foi possível conectar-se com o servidor do SUAP. Verifique se sua conexão com a internet está ativa ou tente novamente mais tarde.",
              duration: 5000,
              position: "bottom"
            }).present()
          } else if (error.status == 400 || error.status == 401) {
            this.toastCtrl.create({
              message: "Atenção: Por favor, entre com um usuário e senha corretos. Note que ambos os campos diferenciam maiúsculas e minúsculas.",
              duration: 5000,
              position: "bottom"
            }).present()
          } else if (error.status == 403) {
            this.toastCtrl.create({
              message: "Atenção: Tentativas excessivas de login. Por favor efetue o login na página inicial do SUAP.",
              duration: 5000,
              position: "bottom"
            }).present()
          } else {
            this.toastCtrl.create({
              message: `Erro: ${ error.statusText }.`,
              duration: 5000,
              position: "bottom"
            }).present()
          }
        }
      );
    } else {
      this.authService.autenticar_acesso_responsavel(
        this.usuario, 
        this.senha
      ).then(
        () => this.navCtrl.setRoot(InicioPage)
      ).catch(
        error => {
          if (error.status == 0) {
            this.toastCtrl.create({
              message: "Atenção: Não foi possível conectar-se com o servidor do SUAP. Verifique se sua conexão com a internet está ativa ou tente novamente mais tarde.",
              duration: 5000,
              position: "bottom"
            }).present()
          } else if (error.status == 400) {
            this.toastCtrl.create({
              message: "Atenção: Por favor, verifique se a matrícula do aluno e a chave de acesso estão corretos. Note que ambos os campos diferenciam maiúsculas e minúsculas.",
              duration: 5000,
              position: "bottom"
            }).present()
          } else {
            this.toastCtrl.create({
              message: `Erro: ${ error.statusText }.`,
              duration: 5000,
              position: "bottom"
            }).present()
          }
        }
      );
    }
  }

  launchUrl(url) {
    this.platform.ready().then(() => {
      this.inAppBrowser.create(url, '_system');
    });
  }
}
