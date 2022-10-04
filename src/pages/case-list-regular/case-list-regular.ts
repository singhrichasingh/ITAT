import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { msg } from '../../app/app.configuration.ts';
import { ApiSvc } from '../../providers/api-svc';
import { global } from '../../app/global';

/*
  Generated class for the CaseListRegular page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-case-list-regular',
  templateUrl: 'case-list-regular.html',
  providers: [ApiSvc],
})
export class CaseListRegularPage {
  @ViewChild('dateTime') dateTime;
  benchList: any = [];
  caseRegularList: any = [];
  casePageForm: any = {};
  casesArr: any = {};
  submitAttampt: boolean = false;
  msg: any = msg;
  public displayDiv = false;
  public displayGrid = false;
  apiErr: boolean = false;
  default: any = {};
  defaultBench: any = {};
  benchInfo: any = [];
  year: any;
  month: any;
  dt: any;
  today: number = Date.now();
  constructor(public navCtrl: NavController, public navParams: NavParams, public FormBuilder: FormBuilder, private apisvc: ApiSvc) {


    //bench
    this.default = { 'id': '0' };
    this.defaultBench = { 'id': '0' };

    this.casePageForm = FormBuilder.group({
      bench: ['', Validators.compose([Validators.required])],
      hearingBench: ['', Validators.compose([Validators.required])],
      hearingDate: ['', Validators.compose([Validators.required])]
    });

  }
  ngOnInit(): void {
    console.log('ngOnInit initilized!');
    // setTimeout(_ => {
    // this.dateTime.setValue(new Date().toISOString());

    // });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseListRegularPage');
    if (global.getBenchData == '') {
      this.apisvc.getData("bench", true, false).subscribe(res => {
        this.benchList = res.data;
        global.getBenchData = res.data;
      },
        err => { this.apisvc.failure(err); this.apiErr = true; }
      );
    } else {
      this.benchList = global.getBenchData;

    }
  }
  // search result
  checkConnection(formData) {

    var caseData = formData;
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
    caseData.hearingDate = this.year + '-' + this.month + '-' + this.dt;

    if (caseData.bench == '0') {
      caseData.bench = '';
    }
    if (caseData.hearingBench == '0') {
      caseData.hearingBench = '';
    }

    if (global.networkFlag != "false") {
      this.apisvc.postData("regular", caseData).subscribe(res => {
        if (res) {
          let data = res["data"];
          if (data.length == "0") {
            this.displayGrid = false;
            this.displayDiv = true;
            return;
          }
          if (this.displayDiv = true) {
            this.displayDiv = false;
          }
          this.displayGrid = true;
          this.caseRegularList = data;
        }
      }, err => {
        this.apisvc.failure(err); this.apiErr = true;
        console.log("failure");
      });
    } else {
      this.apisvc.connectionHandle();
    }
  }
  //hearing bench
  hearingBenchList(value) {
    var benchId = value;

    this.apisvc.postData("hearingBench", benchId).subscribe(res => {
      this.benchInfo = res.data;

    }, err => {
      this.apisvc.failure(err); this.apiErr = true;
      console.log("failure");
    });
  };
  caseListSubmit(form: any): void {

    if (form.valid) {
      console.log("Case form Submit", form.form.value);
    } else {
      console.log("Case form no Submit", this.casesArr);
    }
  };
  validateForm(value) {
    if (value.bench == '0' || value.hearingDate == '' || value.hearingBench == '0' || value.bench == null || value.hearingDate == null || value.hearingBench == null) {
      return true;
    }
    else {
      return false;
    }
  };
  enableOption(value) {
    if (value == '0') {
      return true;
    } else {
      return false;
    }
  };

  resetForm(val) {
    this.casePageForm.reset();
    this.validateForm(val);
    this.displayDiv = false;
  }
}

