import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ActionSheetController, Events} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { msg } from '../../app/app.configuration.ts';
import { ApiSvc } from '../../providers/api-svc';
import { ModalContentView } from '../../modals/modal-content';
import { global } from '../../app/global';
import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
/**
 * Generated class for the CaseDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Injectable()
@Component({
  selector: 'page-case-details',
  templateUrl: 'case-details.html',
})
export class CaseDetailsPage {
id: any;
data: any;
loader: any = null;
foo;
apiErr;
dataId;
btnText = "Favourite this case";
public saved  = false;
filledBy : any;
flag : boolean = false;
  constructor(public apisvc: ApiSvc, 
    public toastCtrl: ToastController, 
    private events:Events,
    public actionSheetCtrl: ActionSheetController, private file: File, private transfer: FileTransfer, public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, private iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseDetailsPage');
    this.id = this.navParams.get("param1");
    this.filledBy = this.navParams.get("param2");
    console.log("hello", this.id);
    console.log("hello again", this.filledBy);
    this.getData();
    var bmList = [];
    bmList = JSON.parse(localStorage.getItem("bmList"));
    var bmId = this.id;
    if (bmList && bmList.length > 0) {
      bmList.forEach(element => {
        if (element.id == bmId) {
          this.btnText = "Unfav";
          this.saved = true;
        }
      });
    }
  }
  getData(){
    let loader;
    let responseData = {
      "id" : this.id
    }
    loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.apisvc.postData("caseStatusDetail", responseData).subscribe(res =>{
      this.data = res;
      console.log("details are", JSON.stringify(this.data));
      if(this.data.data[0].tribunalOrder != null){
        console.log("here detail", this.data.data[0]);        
        console.log("here detail", this.data.data[0].tribunalOrder);
        this.flag = true;
      }
      loader.dismiss();
    }, err =>{
      loader.dismiss();
      this.apisvc.failure(err);
      console.log("failure");
    })
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
          "filledBy": this.filledBy,
          "isChecked": false
        }
        if(this.filledBy == "Department") {
          obj.name = data.data.data[0].respondant;
        } else {
          obj.name = data.data.data[0].appellant;
        }
        bmList.push(obj);
      } else {
        bmList = [];
        obj = {
          "id": data.data.data[0].id,
          "appealNumber": data.data.data[0].appealNo,
          "name": data.data.data[0].appellant,
          "filledBy": this.filledBy,          
          "isChecked": false
        };
        if(this.filledBy == "Department") {
          obj.name = data.data.data[0].respondant;
        } else {
          obj.name = data.data.data[0].appellant;
        }
        bmList.push(obj);
      }
      localStorage.setItem("bmList", JSON.stringify(bmList));

      this.btnText = "Unfav";
      this.saved = true;
      this.events.publish('reloadBookMark');
      this.presentToast();
    }
    else {
      this.unbookmark(data);
    }
  };
  presentToast(){
    let toast = this.toastCtrl.create({
      message: 'Case Bookmarked Successfully!',
      duration: 3000,
      position: 'bottom'      
    });
    toast.present();
  }  
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
    this.btnText = "Fav";
    this.saved = false;
    this.events.publish('reloadBookMark');
    this.presentToastAgain();
  }

  presentToastAgain(){
    let toast = this.toastCtrl.create({
      message: 'Case Unbookmarked Successfully!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  
  // openLink(item) {
  //   this.iab.create('https://docs.google.com/gview?embedded=true&url='+item, '_blank', 'location=no');
  // }

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

  presentToast1(){
    let toast = this.toastCtrl.create({
      message: 'Pdf downloaded successfully!',
      duration: 3000,
      position: 'bottom'      
    });
    toast.present();
  }
}
