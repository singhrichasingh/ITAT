import { Component } from '@angular/core';
import { MenuController, NavController, NavParams, ToastController } from 'ionic-angular';
import { msg } from '../../app/app.configuration.ts';
import { ApiSvc } from '../../providers/api-svc';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { global } from "../../app/global";
import { File } from '@ionic-native/file';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

@Component({
  selector: 'page-notice-board',
  templateUrl: 'notice-board.html',
  providers: [ApiSvc]
})
export class NoticeBoardPage {
  apiErr: boolean = false;
  noticeList: any = [];
  msg: any = msg;
  isNoRecord: boolean = false;
  items: any = [];
  // page = 0;
  // maximumPages = 10;
  constructor(private menuCtrl: MenuController, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private document: DocumentViewer, private file: File, private transfer: FileTransfer, private apisvc: ApiSvc, private iab: InAppBrowser) {

  }

  callGetApi() {
    // notice
    //if (global.noticeList.length === 0) {
    this.apisvc.getData("noticeBoard", false, false).subscribe(res => {
      console.log("notiveBoard Data:- ", res.data);
      if (res && res.isSuccess == "true") {
        this.noticeList = res.data;
        this.isNoRecord = false;
        // for (let i = 0; i < this.noticeList.length; i++) {
        //   this.items.push( this.noticeList[i] );
        // }
        // if (infiniteScroll) {
        //   infiniteScroll.complete();
        // }
        //global.noticeList = res.data;
      } else {
        this.isNoRecord = true;
      }
    },
      err => { this.apisvc.failure(err); this.apiErr = true; }
    );
    // }
    // else {
    //   this.noticeList = global.noticeList;
    //   console.log("this.noticeList:- ", this.noticeList);
    // }
  }

  viewSelected(item) {
    this.iab.create('https://docs.google.com/gview?embedded=true&url=' + item.pdf[0].fileURL, '_blank', 'location=no');
  }
  itemSelected(item) {

    console.log("url is", item.pdf[0].fileURL);

    //  let path = this.file.dataDirectory;
    // //  console.log("uryhumjghl is");
    //   // this.iab.create('https://docs.google.com/gview?embedded=true&url='+item.pdf[0].fileURL, '_blank', 'location=no');
    //   const fileTransfer : FileTransferObject = this.transfer.create();
    //   // // const urlis = item.pdf[0].fileURL;
    //   let orgUrl = item.pdf[0].fileURL;
    //   const urlis = orgUrl.replace("https", "http");
    //   console.log("path", urlis);
    //   fileTransfer.download(urlis, path + 'file.pdf').then((entry) => {
    //     console.log('download complete: ' + entry.toURL());
    //     let url = entry.toURL();
    //     this.iab.create(url, '_blank', 'location=no');
    //     // this.document.viewDocument(url, 'application/pdf', {});
    //   }, (error) => {
    //     console.log("error", error);
    //   });
    let orgUrl = item.pdf[0].fileURL;
    //   const urlis = orgUrl.replace("https", "http");
    let fname = orgUrl.slice(52);
    console.log("urllll", orgUrl);
    console.log("urllldrfgdl", fname);

    let link = orgUrl.replace("https", "http");
    let path = '';
    let dir_name = 'Download'; // directory to download - you can also create new directory
    let file_name = fname; //any file name you like

    const fileTransfer: FileTransferObject = this.transfer.create();
    let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
    result.then((resp) => {
      path = resp.toURL();
      console.log(path);
      fileTransfer.download(link, path + file_name).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        // let way = entry.toURL();
        console.log("native url", entry.nativeURL);
        //  this.document.viewDocument(entry.nativeURL, 'application/pdf', {});
        window.open(entry.nativeURL, "_system", "location=yes,enableViewportScale=yes,hidden=no");
        this.presentToast();
      }, (error) => {
        console.log(error)
      });
    }, (err) => {
      console.log('error on creating path : ' + err);
    });
  }

  itemSelected1(item) {

    console.log("url is", item.pdf[1].fileURL);

    let orgUrl = item.pdf[1].fileURL;
    let fname = orgUrl.slice(52);
    console.log("urllll", orgUrl);
    console.log("urllldrfgdl", fname);
    let link = orgUrl.replace("https", "http");
    let path = '';
    let dir_name = 'Download'; // directory to download - you can also create new directory
    let file_name = fname; //any file name you like

    const fileTransfer: FileTransferObject = this.transfer.create();
    let result = this.file.createDir(this.file.externalRootDirectory, dir_name, true);
    result.then((resp) => {
      path = resp.toURL();
      console.log(path);
      fileTransfer.download(link, path + file_name).then((entry) => {
        console.log('download complete: ' + entry.toURL());
        // let way = entry.toURL();
        console.log("native url", entry.nativeURL);
        //  this.document.viewDocument(entry.nativeURL, 'application/pdf', {});
        window.open(entry.nativeURL, "_system", "location=yes,enableViewportScale=yes,hidden=no");
        this.presentToast();
      }, (error) => {
        console.log(error)
      });
    }, (err) => {
      console.log('error on creating path : ' + err);
    });
  }

  presentToast() {
    const toast = this.toastCtrl.create({
      message: 'Pdf downloaded successfully in download folder!',
      duration: 3000
    });
    toast.present();
  }

  //Page Life Cycle
  ionViewDidLoad() {
    console.log("Notice Board => ionViewDidLoad");
    this.callGetApi();
  }
  // ionViewWillEnter() {
  //   console.log("Notice Board => ionViewWillEnter");
  // }

  // ionViewDidEnter() {
  //   console.log("Notice Board => ionViewDidEnter");

  // }
  // ionViewWillLeave() {
  //   console.log("Notice Board => ionViewWillLeave");
  // }
  // ionViewDidLeave() {
  //   console.log("Notice Board => ionViewDidLeave");
  // }
  // ionViewWillUnload() {
  //   console.log("Notice Board => ionViewWillUnload");
  // }
  //-----------
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    //  global.noticeList = [];
    this.callGetApi();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1200);
  }
  openMenu() {
    this.menuCtrl.open();
  }

  // doInfinite(infiniteScroll) {
  //   this.page++;
  //   this.callGetApi(infiniteScroll);

  //   if (this.page === this.maximumPages) {
  //     infiniteScroll.enable(false);
  //   }
  // }
  // j = 0 ;
  // doInfinite(infiniteScroll) {
  //   console.log('Begin async operation');

  //   setTimeout(() => {
  //   for (let i = 0 ; i < 10; i++) {
  //   this.items.push( this.items.length );
  //   }

  //   console.log('Async operation has ended');
  //   infiniteScroll.complete();
  //   }, 500);
  //   }
}
