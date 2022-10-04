import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ModalController, ToastController, AlertController, Events } from 'ionic-angular';
import { ApiSvc } from '../../providers/api-svc';
import { ModalContentView } from '../../modals/modal-content';
import { CaseStatusPage } from '../case-status/case-status';
declare var navigator: any;
declare var Connection: any;
/*
  Generated class for the BookmarkedCases page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-bookmarked-cases',
  templateUrl: 'bookmarked-cases.html',
  providers: [ApiSvc]
})
export class BookmarkedCasesPage {
  checkboxStatus: boolean = false;
  bookmarkData: any;
  appeal: any;
  bmList: any;
  unbookmarkList: any;
  apiErr: boolean;
  isGridHide: boolean = true;
  constructor(public modalCtrl: ModalController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams,
    private apisvc: ApiSvc,
    public zone: NgZone,
    private events: Events,
    private alertCtrl: AlertController
  ) {

  }
  // delete bookmark
  deleteRow() {
    this.unbookmarkList = this.bookmarkData.filter((x) => x.isChecked)
    this.bmList = JSON.parse(localStorage.getItem("bmList"));
    if (this.unbookmarkList && this.unbookmarkList.length > 0) {
      this.unbookmarkList.forEach(element => {
        // var index = this.bmList.indexOf(element);
        var index = this.bmList.findIndex(x => x.id == element.id);
        this.bmList.splice(index, 1);
      });

      localStorage.setItem("bmList", JSON.stringify(this.bmList));
      this.presentToast();
      this.bindBookmark();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Alert',
        subTitle: "Please select at least one case for Un-bookmarked",
        buttons: ['OK']
      });
      alert.present();
    }
  }
  // checkbox status
  checkbox(status) {
    status.selected = (status.selected) ? false : true;
    console.log(status.selected);
  }

  ionViewDidLoad() {
    this.zone.run(() => {
      this.bindBookmark();
    });
    this.events.subscribe('reloadBookMark', this.callHandler);
  }

  callHandler = () => {
    console.log("Subscribe event signInSegmentSelect");
    this.bindBookmark();
  };

  // load bookmark
  bindBookmark() {
    var bmList = [];

    this.zone.run(() => {
      bmList = JSON.parse(localStorage.getItem("bmList"));
      // console.log(bmList);
      if (bmList && bmList.length > 0) {
        this.bookmarkData = bmList;
        console.log("Bookmark List:- ", bmList);
        this.isGridHide = false;
      }
      else {
        this.isGridHide = true;
      }
    });

  }
  // display bookmark
  openBookmark(id) {
    this.apisvc.postData("caseStatusDetail", { "id": id }).subscribe(data => {
      this.sendData(id, data);
    }, err => {
      this.apisvc.failure(err); this.apiErr = true;
      console.log("failure");
    });

  }
  sendData(id, modelData) {
    let testObj = { data: modelData };
    let contactModal = this.modalCtrl.create(ModalContentView, testObj);
    contactModal.present();
  }

  trackByFn(index, item) {
    return item ? item.id : undefined;
  }
  // check all bookmark
  cbAll() {
    let bmList = [];
    let isOneChecked = false;
    bmList = JSON.parse(localStorage.getItem("bmList"));
    bmList.forEach(element => {
      if (element.isChecked)
        isOneChecked = true;
    });
    bmList.forEach(element => {
      if (isOneChecked)
        element.isChecked = false;
      else
        element.isChecked = true;
    });
    this.bookmarkData = bmList;
    localStorage.setItem("bmList", JSON.stringify(bmList));
  }
  // navigate to case status page
  naviToCaseStatus() {
    this.navCtrl.push(CaseStatusPage);

  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Case Unbookmarked Successfully!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}