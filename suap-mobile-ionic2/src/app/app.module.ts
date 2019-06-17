import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SuapMobile } from './app.component';
import { LOCALE_ID } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { IonicStorageModule } from '@ionic/storage';

// Páginas Gerais
import { LoginPage } from '../pages/login/login';
import { InicioPage } from '../pages/inicio/inicio';

// Páginas do Perfil de Aluno
import { TurmasVirtuaisPage } from '../pages/turmas-virtuais/turmas-virtuais';
import { TurmaVirtualPage } from '../pages/turma-virtual/turma-virtual';
import { DadosGeraisTurmaVirtualPage } from '../pages/turma-virtual/dados-gerais';
import { ParticipantesTurmaVirtualPage } from '../pages/turma-virtual/participantes';
import { AulasMinistradasTurmaVirtualPage } from '../pages/turma-virtual/aulas-ministradas';
import { MateriaisDeAulaTurmaVirtualPage } from '../pages/turma-virtual/materiais-de-aula';
import { LocaisHorariosAulasPage } from '../pages/locais-horarios-aulas/locais-horarios-aulas';
import { BoletimPage } from '../pages/boletim/boletim';
import { ProximasAvaliacoesPage } from '../pages/proximas-avaliacoes/proximas-avaliacoes';

// Páginas do Perfil de Servidor
import { ServidoresPage } from '../pages/servidores/servidores';
import { SetoresPage } from '../pages/setores/setores';
import { ContrachequesPage } from '../pages/contracheques/contracheques';
import { DetalheContrachequePage } from '../pages/contracheques/detalhe-contracheque';
import { FrequenciasPage } from '../pages/frequencias/frequencias';
import { ProcessosPage } from '../pages/processos/processos';
import { DetalheProcessoPage } from '../pages/processos/detalhe-processo';
import { DetalheTramiteModal } from '../pages/processos/modal-tramite';
import { HistoricoFuncionalPage } from '../pages/meus-dados/historico-funcional/historico-funcional';
import { FeriasPage } from '../pages/meus-dados/ferias/ferias';
import { OcorrenciasAfastamentosPage } from '../pages/meus-dados/ocorrencias-afastamentos/ocorrencias-afastamentos';
import { ParticipacoesProjetosPage } from '../pages/meus-dados/participacoes-projetos/participacoes-projetos';

// Services
import { AuthService } from './auth.service';
import { ServidoresService } from './servidores.service';
import { AlunosService } from './alunos.service';
import { TelaInicialService } from './tela_inicial.service';

@NgModule({
  declarations: [
    SuapMobile,
    LoginPage,
    InicioPage,

    // Páginas do Perfil de Aluno
    TurmasVirtuaisPage,
    TurmaVirtualPage,
    DadosGeraisTurmaVirtualPage,
    ParticipantesTurmaVirtualPage,
    AulasMinistradasTurmaVirtualPage,
    MateriaisDeAulaTurmaVirtualPage,
    LocaisHorariosAulasPage,
    BoletimPage,
    ProximasAvaliacoesPage,

    // Páginas do Perfil de Servidor
    ServidoresPage,
    SetoresPage,
    ContrachequesPage,
    DetalheContrachequePage,
    FrequenciasPage,
    ProcessosPage,
    DetalheProcessoPage,
    DetalheTramiteModal,
    HistoricoFuncionalPage,
    FeriasPage,
    OcorrenciasAfastamentosPage,
    ParticipacoesProjetosPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(SuapMobile, {
      backButtonText: '',
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SuapMobile,
    LoginPage,
    InicioPage,
    TurmasVirtuaisPage,
    TurmaVirtualPage,
    DadosGeraisTurmaVirtualPage,
    ParticipantesTurmaVirtualPage,
    AulasMinistradasTurmaVirtualPage,
    MateriaisDeAulaTurmaVirtualPage,
    LocaisHorariosAulasPage,
    BoletimPage,
    ProximasAvaliacoesPage,
    ServidoresPage,
    SetoresPage,
    ContrachequesPage,
    DetalheContrachequePage,
    FrequenciasPage,
    ProcessosPage,
    DetalheProcessoPage,
    DetalheTramiteModal,
    HistoricoFuncionalPage,
    FeriasPage,
    OcorrenciasAfastamentosPage,
    ParticipacoesProjetosPage
  ],
  providers: [
    AuthService,
    ServidoresService,
    AlunosService,
    TelaInicialService,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    GoogleAnalytics,
    {provide: LOCALE_ID, useValue: "pt-BR"},
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
