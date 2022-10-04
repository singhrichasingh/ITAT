//import { importType } from '@angular/compiler/src/output/output_ast';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { NoticeBoardPage } from '../pages/notice-board/notice-board';
// import { CauseListSpecialPage } from '../pages/cause-list-special/cause-list-special';
import { CaseStatusPage } from '../pages/case-status/case-status';
//import { CaseStatusCopyPage } from '../pages/case-status-copy/case-status';
import { CaseListRegularPage } from '../pages/case-list-regular/case-list-regular';
// import { RealTimeProceedingsSearchPage } from '../pages/real-time-proceedings-search/real-time-proceedings-search';
import { BookmarkedCasesPage } from '../pages/bookmarked-cases/bookmarked-cases';
import { TribunalOrdersPage } from '../pages/tribunal-orders/tribunal-orders';
import { CaseDetailsPage } from '../pages/case-details/case-details';
import { AboutPage } from '../pages/about/about';
import { TribunalBenchesPage } from '../pages/tribunal-benches/tribunal-benches';
import { TermAndConditionPage } from '../pages/term-and-condition/term-and-condition';
import { ContactUsPage } from '../pages/contact-us/contact-us';
import { AboutPresidentPage } from '../pages/about-president/about-president';
import { global } from './global';
import { ApiSvc } from '../providers/api-svc';
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { Network } from '@ionic-native/network';

@Component({
  templateUrl: 'app.html',
  providers: [ApiSvc]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = NoticeBoardPage;
  public alertShown:boolean = false;
  pages: Array<{ title: string, pageIcon: string; component: any }>;

  constructor(public apisvc: ApiSvc, public platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private network: Network, public alertCtrl: AlertController) {
    this.initializeApp();

    this.network.onConnect().subscribe(() => {
      global.networkFlag = "true";
      console.log('network connected!');

    });
    this.network.onDisconnect().subscribe(() => {
      global.networkFlag = "false";
      this.apisvc.showAlert('No Internet', 'Please check your internet connection!');
    });
    // used for an example of ngFor and navigation
    this.pages = [

      { title: 'Notice Board (Judicial)', pageIcon: 'ios-noticeBoard-outline', component: NoticeBoardPage },
      { title: 'Case Status', pageIcon: 'ios-caseStatus-outline', component: CaseStatusPage },

      // { title: 'Cause Lists (Regular)', pageIcon: "ios-causeList-outline", component: CaseListRegularPage },
      // { title: 'Cause Lists (Special)', pageIcon: "ios-caseList-outline", component: CauseListSpecialPage },
      { title: 'Tribunal Orders', pageIcon: "ios-tribunalOrder-outline", component: TribunalOrdersPage },
      // { title: 'Real-Time Display Boards', pageIcon: "ios-displayBoards-outline", component: RealTimeProceedingsSearchPage },
      { title: 'Bookmarked Cases', pageIcon: "ios-bookmark1-outline", component: BookmarkedCasesPage },
      { title: 'About ITAT', pageIcon: "ios-information-circle-outline", component: AboutPage },
      { title: 'Tribunal Benches', pageIcon: "ios-causeList-outline", component: TribunalBenchesPage },
      { title: 'About The President', pageIcon: "md-contact", component: AboutPresidentPage},
      { title: 'Terms & Conditions', pageIcon: "ios-document-outline", component: TermAndConditionPage },
      { title: 'Contact Us', pageIcon: "md-contact", component:  ContactUsPage},
      
      //{ title: 'Case Status Copy', pageIcon:"ios-briefcase-outline", component: CaseStatusCopyPage },

    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.platform.registerBackButtonAction(() => {
        if (this.alertShown==false) {
          this.presentConfirm();  
        }
      }, 0)
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm Exit',
      message: 'Do you want to exit?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.alertShown=false;
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Yes clicked');
            this.platform.exitApp();
          }
        }
      ]
    });
     alert.present().then(()=>{
      this.alertShown=true;
    });
  }
}
