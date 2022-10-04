import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { msg } from '../../app/app.configuration.ts';
import { ApiSvc } from '../../providers/api-svc';
import { Injectable } from '@angular/core';

@Injectable()
@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  data: any;
  constructor(public apisvc: ApiSvc, public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
    this.getApi();
  }
  getApi() {
    this.apisvc.getData("contactPage", true, false).subscribe(res => {
      // this.data = res.data[0].html;
      // this.data = res.data[0].html.replace(new RegExp("https", 'g'), 'http');
      this.data = res.data[0].html.replace("https", "http");

      console.log("data is" + JSON.stringify(this.data));
    })
  }
}
