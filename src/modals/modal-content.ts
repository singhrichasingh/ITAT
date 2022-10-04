import { Component } from '@angular/core';
import { NavParams, Platform, ViewController, ToastController, ActionSheetController, Events} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Component({
  template: `
<ion-header no-border>
    <ion-navbar>   
        <ion-grid>
        <ion-row style="margin: auto;text-align: center;">
        <ion-col col-1>
        <ion-icon ios="ios-arrow-round-back" md="md-arrow-round-back" (click)="dismiss()" style="font-size:2.0em !important;"></ion-icon>
        </ion-col>
        <ion-col class="head">
        <ion-title style="font-size:1.6em !important;">      Case Details    </ion-title>        
        </ion-col>
        <ion-col>
        <ion-icon ios="ios-heart" md="md-heart" [hidden]="!saved" (click)="bookmarkCase(this)"></ion-icon>
        <ion-icon ios="ios-heart-outline" md="md-heart-outline" [hidden]="saved" (click)="bookmarkCase(this)"></ion-icon>
        </ion-col>
        </ion-row>
        </ion-grid>
        
    </ion-navbar> 
</ion-header>

<ion-content class="model-case-details">
 <ion-grid>
 <ion-row>
 <ion-col class="headerColumn headerColumn1">Appeal No</ion-col>
 <ion-col class="headerColumn headerColumn1">Filed On</ion-col>
 </ion-row>
 <ion-row>
 <ion-col class="col-new block1">{{data.data[0].appealNo}}</ion-col>
 <ion-col class="col-new block1">{{data.data[0].filedOn}}</ion-col>
 </ion-row>
 <ion-row>
 <ion-col class="headerColumn headerColumn1">Assessment Year</ion-col>
 <ion-col class="headerColumn headerColumn1">Bench Alloted</ion-col>
 <ion-col class="headerColumn headerColumn1">Case Status</ion-col>
 </ion-row>
 <ion-row>
 <ion-col class="col-new block1">{{data.data[0].assessementYear}}</ion-col>
 <ion-col class="col-new block1">{{data.data[0].benchAlloted}}</ion-col>
 <ion-col class="col-new block1">{{data.data[0].caseStatus}}</ion-col>
 </ion-row>
 <ion-row>
 <ion-col class="headerColumn headerColumn1">Appellant</ion-col>
 </ion-row>
 <ion-row>
 <ion-col class="col-new block1">{{data.data[0].appellant}}</ion-col>
 </ion-row>
 <ion-row>
 <ion-col class="headerColumn headerColumn1">Respondant</ion-col>
 </ion-row>
 <ion-row>
 <ion-col class="col-new block1">{{data.data[0].respondant}}</ion-col>
 </ion-row>
 <ion-row>
 <ion-col col-8 text-left class="col-new block1">Date of First Hearing</ion-col>
 <ion-col col-4 text-left class="col-new block1">{{data.data[0].hearingDate}}</ion-col>
 </ion-row>
 <ion-row>
 <ion-col col-8 text-left class="col-new block1">Date of Last Hearing</ion-col>
 <ion-col col-4 text-left class="col-new block1">{{data.data[0].lastHearing}}</ion-col>
 </ion-row>
 <ion-row>
 <ion-col col-8 text-left class="col-new block1">Date of Next Hearing</ion-col>
 <ion-col col-4 text-left class="col-new block1">{{data.data[0].nextHearing}}</ion-col>
 </ion-row>
 <ion-row>
 <ion-col col-8 text-left class="col-new block1">Date of Final Hearing</ion-col>
 <ion-col col-4 text-left class="col-new block1">{{data.data[0].finalHearing}}</ion-col>
 </ion-row>
 <ion-row>
 <ion-col col-8 text-left class="col-new block1">Date of Tribunal Order</ion-col>
 <ion-col col-4 text-left class="col-new block1">{{data.data[0].tribunalOrderDate}}</ion-col>
 </ion-row>
 <ion-row>
 <ion-col col-8 text-left class="col-new block1">Date of Pronouncement</ion-col>
 <ion-col col-4 text-left class="col-new block1">{{data.data[0].pronouncementDate}}</ion-col>
 </ion-row>
 <ion-row>
 <ion-col col-8 text-left class="col-new block1">Order Result</ion-col>
 <ion-col col-4 text-left class="col-new block1">{{data.data[0].orderResult}}</ion-col>
 </ion-row>
 <ion-row class="flex-center-row">
 <ion-col col-8 text-left class="col-new block1">Tribunal Order</ion-col>
 <ion-col col-4 text-wrap text-left (click)=openLink(data.data[0].tribunalOrder) class="col-new block1">
 <p class="clickable p-padding" [hidden]=!flag><a>Click Here</a></p>
 </ion-col>
 </ion-row>
 </ion-grid>
</ion-content>
`
})


export class ModalContentView {
  foo;
  data;
  apiErr;
  dataId;
  flag : boolean = false;
  public saved  = false;
  
  btnText = "Favourite this case";
  constructor(
    public platform: Platform,
    public params: NavParams,
    public viewCtrl: ViewController,
    private iab: InAppBrowser,
    private events:Events,
    public toastCtrl : ToastController,
    public actionSheetCtrl: ActionSheetController,
    private file: File, private transfer: FileTransfer
  ) {
    this.data = this.params.get('data');
    console.log(JSON.stringify(this.data));
    if(this.data.data[0].tribunalOrder != null){
      console.log("here");
      this.flag = true;
    }

  }

  presentToast(){
    let toast = this.toastCtrl.create({
      message: 'Case Bookmarked Successfully!',
      duration: 3000,
      position: 'bottom'      
    });
    toast.present();
  } 

  presentToast1(){
    let toast = this.toastCtrl.create({
      message: 'Pdf downloaded successfully!',
      duration: 3000,
      position: 'bottom'      
    });
    toast.present();
  } 

  presentToastAgain(){
    let toast = this.toastCtrl.create({
      message: 'Case unbookmarked Successfully!',
      duration: 3000,
      position: 'bottom'      
    });
    toast.present();
  } 

  presentActionSheet(item) {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Open',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
            this.openPdf(item);
          }
        },{
          text: 'Download',
          handler: () => {
            console.log('Archive clicked');
            this.downloadPdf(item);
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  bookmarkCase(data) {
    if (this.saved == false) {
      var bmList = [];
      var obj;
      bmList = JSON.parse(localStorage.getItem("bmList"));
      if (bmList && bmList.length > 0) {
        obj = {
          "id": data.data.data[0].id,
          "appealNumber": data.data.data[0].appealNo,
          "name": data.data.data[0].appellant,
          "isChecked": false
        }
        bmList.push(obj);
      } else {
        bmList = [];
        obj = {
          "id": data.data.data[0].id,
          "appealNumber": data.data.data[0].appealNo,
          "name": data.data.data[0].appellant,
          "isChecked": false
        };
        bmList.push(obj);
      }
      localStorage.setItem("bmList", JSON.stringify(bmList));

      this.btnText = "Unfavourite";
      this.saved = true;
      this.events.publish('reloadBookMark');
      this.presentToast();
    }
    else {
      this.unbookmark(data);
    }
  };

  unbookmark(data) {
    let bmList = JSON.parse(localStorage.getItem("bmList"));
    let unbookmarkList = [{
      "id": data.data.data[0].id,
      "appealNumber": data.data.data[0].appealNo,
      "name": data.data.data[0].appellant
    }];
    unbookmarkList.forEach(element => {
      var index = bmList.indexOf(element);
      bmList.splice(index, 1);
    });
    localStorage.setItem("bmList", JSON.stringify(bmList));
    this.btnText = "Favourite";
    this.saved = false;
    this.events.publish('reloadBookMark');
    this.presentToastAgain();      
  }

  ionViewDidEnter(): void {
    console.log('Bookmark ngOnInit initilized!');
    var bmList = [];
    bmList = JSON.parse(localStorage.getItem("bmList"));
    var bmId = this.params.get('data').data[0].id;
    if (bmList && bmList.length > 0) {
      bmList.forEach(element => {
        if (element.id == bmId) {
          this.btnText = "Unfavourite";
          this.saved = true;                
        }
      });
    }
  }

  openLink(item) {
    this.presentActionSheet(item);
  }
  openPdf(item){
    this.iab.create('https://docs.google.com/gview?embedded=true&url='+item, '_blank', 'location=no');
  }
  downloadPdf(item){
    console.log("url is", item);

    let orgUrl = item;
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
        this.presentToast1();
      }, (error) => {
        console.log(error)
      });
    }, (err) => {
      console.log('error on creating path : ' + err);
    });
  }
}