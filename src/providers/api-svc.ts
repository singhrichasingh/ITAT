import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { apiURL, msg } from '../app/app.configuration';
import { AlertController, LoadingController } from 'ionic-angular';
import { TimeoutDebouncer } from 'ionic-angular/umd/util/debouncer';
import "rxjs/add/operator/timeout";
/*
  Generated class for the ApiSvc provider.
  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class ApiSvc {
  data: any = null;
  loader: any = null;

  constructor(public http: Http, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

  }


  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.http.get('path/to/data.json')
        .map(res => res.json())
        .subscribe(
        data => {
          this.data = data;
          resolve(this.data);
        },
        err => {
          this.data = err;
        }

        );
    });
  }


  getData(svcName, isLoaderShow, isMultiCall) {
    let loader;
    if (isLoaderShow && this.loader == null) {
      loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
    }
    return this.http.get(apiURL.base + apiURL[svcName])
      .map(
      res => res.json(),
      setTimeout(() => {
        isLoaderShow ? isMultiCall ? loader.dismiss() : loader.dismiss() : ""
      }, 1000)
      );
  }


  postData(svcName, parameters) {
    // this.loader = null;
    // this.loader = this.loadingCtrl.create({
    //   content: "Getting data Please wait..."
    // });
    // this.loader.present();

    let headers = new Headers({
      'Content-Type': 'application/json', //application/x-www-form-urlencoded
      'Accept': 'application/json' //application/x-www-form-urlencoded
    }); // ... Set content type to JSON
    let options = new RequestOptions({ headers: headers }); // Cre
    return this.http.post(apiURL.base + apiURL[svcName], parameters, options).timeout(120000).map(
      res => res.json()
      // setTimeout(() => {

      // }, 0)
    )
  }

  failure(err) {
    if (this.loader) {
      this.loader.dismiss();
    }
    console.log("Server Failed:-", err);
    if (err.status != "200") {
      console.log("Service Failed With:- " + err.status);
      // this.showAlert("Error" + err.status, "Service Not Found");
    }

    if (err.statusText.toUpperCase() === 'TIMEOUT') {
      this.showAlert("", msg.svcFailed.timeOut);
      msg.svcFailedMsg = msg.svcFailed.timeOut;
    }
    else
      if (err.statusText.toUpperCase() === "NOT FOUND") {
        this.showAlert("", msg.svcFailed.notFound);
        msg.svcFailedMsg = msg.svcFailed.notFound;
      }
      else
        if (err.statusText.toUpperCase() == "PARSERERROR") {
          this.showAlert("", msg.svcFailed.parserError);
          msg.svcFailedMsg = msg.svcFailed.parserError;
        }
        else
          if (err.statusText.toUpperCase() == "ABORT") {
            this.showAlert("", msg.svcFailed.abort);
            msg.svcFailedMsg = msg.svcFailed.abort;
          }
          else
            if (err.statusText.toUpperCase() == "ERROR") {
              this.showAlert("", msg.svcFailed.error);
              msg.svcFailedMsg = msg.svcFailed.error;
            }
            else
              if (err.statusText.toUpperCase() == "INTERNAL SERVER ERROR") {
                this.showAlert("", msg.svcFailed.internalServerError);
                msg.svcFailedMsg = msg.svcFailed.internalServerError;
              }
              else
                if (err.statusText.toUpperCase() == "BAD REQUEST") {
                  this.showAlert("", msg.svcFailed.badRequest);
                  msg.svcFailedMsg = msg.svcFailed.badRequest;
                }
                else {
                  this.showAlert("", msg.svcFailed.other);
                  msg.svcFailedMsg = msg.svcFailed.other;
                }
  }


  showAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: '<ion-icon ios="ios-alert" md="md-alert"></ion-icon>' + title,
      subTitle: "",
      message: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
  connectionHandle() {
    this.showAlert('No Internet', 'Please check your internet connection!');
  }

}
