import { Component, ElementRef} from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { msg } from '../../app/app.configuration.ts';
import { ApiSvc } from '../../providers/api-svc';
import { Injectable } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Injectable()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
data : any;
link : any;
dataNew : any;
  constructor(private el: ElementRef, public apisvc: ApiSvc, private iab: InAppBrowser, public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.getApi();
  }

  getApi(){
    this.apisvc.getData("about", true, false).subscribe(res =>{
      this.data = res.data[0].html; 
     this.dataNew =  this.data.slice(0, 4314);
      console.log("data is"+ JSON.stringify(this.data));
      this.link = res.data[0].url;
      console.log("data >>>>", res);
  })
  }
  openPdf(link){
    console.log("url is", link);
    this.iab.create(link, '_system');
  }
}
