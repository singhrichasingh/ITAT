import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { msg } from '../../app/app.configuration.ts';
import { ApiSvc } from '../../providers/api-svc';
import { Injectable } from '@angular/core';

/**
 * Generated class for the TribunalBenchesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Injectable()
@Component({
  selector: 'page-tribunal-benches',
  templateUrl: 'tribunal-benches.html',
})
export class TribunalBenchesPage {
data : any;
  constructor(public apisvc: ApiSvc, public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TribunalBenchesPage');
    this.getApi();
  }
  getApi(){
    this.apisvc.getData("tribunal", true, false).subscribe(res =>{
      this.data = res.data;
      console.log("data is"+ JSON.stringify(this.data));
  }, err => { this.apisvc.failure(err);  })
}
}