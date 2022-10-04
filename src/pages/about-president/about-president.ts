import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { msg } from '../../app/app.configuration.ts';
import { ApiSvc } from '../../providers/api-svc';
import { Injectable } from '@angular/core';

@Component({
  selector: 'page-about-president',
  templateUrl: 'about-president.html',
})
export class AboutPresidentPage {
data : any;
img : any;
title : any;
  constructor(public apisvc: ApiSvc, public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPresidentPage');
    this.getApi();
  }
  getApi(){
    this.apisvc.getData("president", true, false).subscribe(res =>{
        // this.img = res.data[0].image;
        this.img = res.data[0].image.replace("https", "http");

        this.title = res.data[0].title;
        this.data = res.data[0].html;
        console.log("data is", res);
    })
  }
}
