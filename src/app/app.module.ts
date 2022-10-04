import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NoticeBoardPage } from '../pages/notice-board/notice-board';
import { CaseStatusPage } from '../pages/case-status/case-status';
//import { CaseStatusCopyPage } from '../pages/case-status-copy/case-status';
import { CaseListRegularPage } from '../pages/case-list-regular/case-list-regular';
import { MandatoryMarkerComponent } from '../components/mandatory-marker/mandatory-marker';
//import { customValidation } from '../validators/validators';
import { RealTimeProceedingsSearchPage } from '../pages/real-time-proceedings-search/real-time-proceedings-search';
import { CauseListSpecialPage } from '../pages/cause-list-special/cause-list-special';
import { BookmarkedCasesPage } from '../pages/bookmarked-cases/bookmarked-cases';
import { TribunalOrdersPage } from '../pages/tribunal-orders/tribunal-orders';
import { CaseDetailsPage } from '../pages/case-details/case-details';
import { AboutPage } from '../pages/about/about';
import { TribunalBenchesPage } from '../pages/tribunal-benches/tribunal-benches';
import { TermAndConditionPage } from '../pages/term-and-condition/term-and-condition';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { AboutPresidentPage } from '../pages/about-president/about-president';
import { ApiSvc } from '../providers/api-svc';
//import { apiURL } from '../app/app.configuration';
import { ModalContentView } from '../modals/modal-content';
//-----------Upgrade to Ionic 3
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { BrowserModule } from '@angular/platform-browser';
import { Network } from '@ionic-native/network';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HttpModule } from '@angular/http';
import { ComponentsServiceInfoComponent } from '../components/components-service-info/components-service-info';
// import { IonicStorageModule } from '@ionic-native/storage';
import { DatePicker } from '@ionic-native/date-picker';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';

@NgModule({
  declarations: [
    MyApp,
    NoticeBoardPage, //Page
    CaseStatusPage, //Page
    CaseListRegularPage, //Page
    CauseListSpecialPage, //Page
    MandatoryMarkerComponent, //Component
    RealTimeProceedingsSearchPage, //Page
    CaseDetailsPage,
    BookmarkedCasesPage,
    TribunalOrdersPage,
    ModalContentView,
    ComponentsServiceInfoComponent,
    AboutPage,
    TribunalBenchesPage,
    TermAndConditionPage,
    ContactUsPage,
    AboutPresidentPage
    // CaseStatusCopyPage
  ],
  imports: [
    BrowserModule,  // New in ionic 3
    HttpModule,  // New in ionic 3
    IonicModule.forRoot(MyApp),
    //IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NoticeBoardPage, //Page
    CaseStatusPage, //Page
    // CaseListRegularPage, //Page
    // CauseListSpecialPage, //Page
    // RealTimeProceedingsSearchPage, //Page
    BookmarkedCasesPage,
    TribunalOrdersPage,
    ModalContentView,
    CaseDetailsPage,
    AboutPage,
    TribunalBenchesPage,
    TermAndConditionPage,
    ContactUsPage,
    AboutPresidentPage
    //  CaseStatusCopyPage
  ],
  providers: [
    ApiSvc,
    StatusBar, // Newly add for ionic 3
    SplashScreen, // Newly add for ionic 3
    Network,
    InAppBrowser,
    DatePicker,
    File,
    DocumentViewer,
    FileTransfer,
    { provide: ErrorHandler, useClass: IonicErrorHandler }],
    
})
export class AppModule { }
