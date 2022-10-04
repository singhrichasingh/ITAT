import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { msg } from '../../app/app.configuration.ts';
import { ApiSvc } from '../../providers/api-svc';
import { global } from '../../app/global';

/*
  Generated class for the CauseListSpecial page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cause-list-special',
  templateUrl: 'cause-list-special.html',
  providers: [ApiSvc],
})
export class CauseListSpecialPage {
  @ViewChild('dateTime') dateTime;
  benchList: any;
  causePageForm : any;
  casesArr : any;
  causeSpecialList: any;
  judgeListBefore: any;
  causeSpecialListTitle: any;
  causeSpecialAppealList: any;
  judgeListAfter: any;
  causeSpecialListTitle1: any;
  causeSpecialList1: any;
  causeSpecialAppealType: any;
  public displayDiv = false;
  public displayGrid = false;
  msg: any = msg;
  apiErr: boolean = false;
  postObject : any;
  default: any;
  year: any;
  month: any;
  dt: any;
  dataPost : any=[];
  //Sourabh
  appealType: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public FormBuilder: FormBuilder, private apisvc: ApiSvc) {

    //bench 
    this.default = { 'id': '0' };
    if (global.getBenchData == '') {
      this.apisvc.getData("bench", true, false).subscribe(res => {

        this.benchList = res.data;

      },
        err => { this.apisvc.failure(err); this.apiErr = true; }
      );
    } else {
      this.benchList = global.getBenchData;
    }
    this.causePageForm = FormBuilder.group({
      bench: ['', Validators.compose([Validators.required])],
      hearingDate: ['', Validators.compose([Validators.required])]
    });
  }
  ngOnInit(): void {
    console.log('ngOnInit initilized!');
    setTimeout(_ => {
      this.dateTime.setValue(new Date().toISOString());
    });
  }
  causePageSubmit(form: any): void {


    if (form.valid) {
      console.log("Case form Submit", form.form.value);

    } else {
      console.log("Case form no Submit", this.casesArr);
    }
  };
  // search result
  checkConnection(formData) {

    var submitData = formData;
    var dateString = formData.hearingDate;
    var getDate = Date.parse(dateString);
    var today = new Date(getDate);
    this.year = today.getFullYear();
    this.month = today.getMonth() + 1;
    this.dt = today.getDate();
    if (this.dt < 10) {
      this.dt = '0' + this.dt;
    }
    if (this.month < 10) {
      this.month = '0' + this.month;
    }
    submitData.hearingDate = this.year + '-' + this.month + '-' + this.dt;
    if (global.networkFlag != "false") {
// search
      this.apisvc.postData("special", submitData).subscribe(data => {
         this.dataPost = data;
if (data && data.isSuccess == "true") {
  if (this.dataPost.data.length == "0") {
          this.displayGrid = false;
          this.displayDiv = true;
          return;
        }
        if (this.displayDiv = true) {
          this.displayDiv = false;
           this.displayGrid = true;
        this.judgeListBefore = this.dataPost.data[0].judgeList.Before;
        this.judgeListAfter = this.dataPost.data[0].judgeList.And;
        this.appealType = this.dataPost.data[0].appealType;

        }
}
else{
      this.displayGrid = false;
      this.displayDiv = true;
}

      }, err => {
        this.apisvc.failure(err); this.apiErr = true;
        console.log("failure");
      });
    } else {
      this.apisvc.connectionHandle();
    }
  }
  validateForm(bench, hearingDate) {
    if (bench == '0' || hearingDate == '') {
      return true;
    } else {
      return false;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CauseListSpecialPage');
  }

}
