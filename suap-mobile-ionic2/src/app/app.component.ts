import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, ToastController, Events } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleAnalytics  } from '@ionic-native/google-analytics';
import { LoginPage } from '../pages/login/login';
import { InicioPage } from '../pages/inicio/inicio';
import { TurmasVirtuaisPage } from '../pages/turmas-virtuais/turmas-virtuais';
import { LocaisHorariosAulasPage } from '../pages/locais-horarios-aulas/locais-horarios-aulas';
import { BoletimPage } from '../pages/boletim/boletim';
import { ProximasAvaliacoesPage } from '../pages/proximas-avaliacoes/proximas-avaliacoes'
import { ServidoresPage } from '../pages/servidores/servidores';
import { SetoresPage } from '../pages/setores/setores';
import { ContrachequesPage } from '../pages/contracheques/contracheques';
import { FrequenciasPage } from '../pages/frequencias/frequencias';
import { ProcessosPage } from '../pages/processos/processos';
import { HistoricoFuncionalPage } from '../pages/meus-dados/historico-funcional/historico-funcional';
import { FeriasPage } from '../pages/meus-dados/ferias/ferias';
import { OcorrenciasAfastamentosPage } from '../pages/meus-dados/ocorrencias-afastamentos/ocorrencias-afastamentos';
import { ParticipacoesProjetosPage } from '../pages/meus-dados/participacoes-projetos/participacoes-projetos';
import { AuthService } from './auth.service';

@Component({
  templateUrl: 'app.html'
})
export class SuapMobile {
  // static API_URL = "https://suap.ifrn.edu.br/";
  static API_URL = "https://10.1.0.76/";

  // Utilizado para controlar o botão de voltar.
  private lastBack;
  private allowClose = false;

  // Utilizado no Accordion do Menu
  shownGroup = null;

  toggleGroup(group){
    if (this.isGroupShown(group)){
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };

  isGroupShown(group) {
    return this.shownGroup === group;
  };

  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(
    public platform: Platform,
    private authService:AuthService,
    private app: App,
    private toastCtrl: ToastController,
    private events: Events,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private googleAnalytics: GoogleAnalytics
  ) {
    this.initializeApp();
  };

  initializeApp() {
    if (this.authService.autenticado) {
      this.rootPage = InicioPage;
    } else {
      this.rootPage = LoginPage;
    };

    this.platform.registerBackButtonAction(() => {
      const nav = this.app.getActiveNav();
      const closeDelay = 2000;
      const spamDelay = 500;

      if(nav.canGoBack()){
        nav.pop();
      } else if(Date.now() - this.lastBack > spamDelay && !this.allowClose) {
        this.allowClose = true;
        let toast = this.toastCtrl.create({
          message: 'Pressione novamente para sair.',
          duration: closeDelay,
          dismissOnPageChange: true
        });
        toast.onDidDismiss(() => {
          this.allowClose = false;
        });
        toast.present();
      } else if(Date.now() - this.lastBack < closeDelay && this.allowClose) {
        this.platform.exitApp();
      }
      this.lastBack = Date.now();
    });

    this.platform.ready().then(() => {
      this.statusBar.styleBlackOpaque();
      this.splashScreen.hide();

      this.googleAnalytics.startTrackerWithId('UA-96140313-1').then(() => {
        console.log('Google analytics is ready now');
      }).catch(e => console.log('Error starting GoogleAnalytics:', e));
    });
  }

  abrirInicioPage() {
    this.nav.setRoot(InicioPage);
  }

  abrirTurmasVirtuaisPage() {
    this.nav.setRoot(TurmasVirtuaisPage);
  }

  abrirLocaisHorariosAulasPage() {
    this.nav.setRoot(LocaisHorariosAulasPage);
  }

  abrirBoletimPage() {
    this.nav.setRoot(BoletimPage);
  }

  abrirProximasAvaliacoesPage() {
    this.nav.setRoot(ProximasAvaliacoesPage);
  }

  abrirServidoresPage() {
    this.nav.setRoot(ServidoresPage);
  }

  abrirSetoresPage() {
    this.nav.setRoot(SetoresPage);
  }

  abrirContrachequesPage() {
    this.nav.setRoot(ContrachequesPage);
  }

  abrirFrequenciasPage() {
    this.nav.setRoot(FrequenciasPage);
  }

  abrirProcessosPage() {
    this.nav.setRoot(ProcessosPage);
  }

  abrirHistoricoFuncionalPage() {
    this.nav.setRoot(HistoricoFuncionalPage);
  }

  abrirFeriasPage() {
    this.nav.setRoot(FeriasPage);
  }

  abrirOcorrenciasAfastamentosPage() {
    this.nav.setRoot(OcorrenciasAfastamentosPage);
  }

  abrirParticipacoesProjetosPage() {
    this.nav.setRoot(ParticipacoesProjetosPage);
  }

  menuClosed() {
    this.shownGroup = null;
    this.events.publish('menu:closed', '');
  }

  menuOpened() {
    this.shownGroup = null;
    this.events.publish('menu:opened', '');
  }

  sair() {
    localStorage.clear();
    this.nav.setRoot(LoginPage);
  }
}
