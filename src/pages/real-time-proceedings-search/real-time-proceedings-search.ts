import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { msg } from '../../app/app.configuration.ts';
import { ApiSvc } from '../../providers/api-svc';
import { global } from '../../app/global';

/*
  Generated class for the RealTimeProceedingsSearch page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-real-time-proceedings-search',
  templateUrl: 'real-time-proceedings-search.html',
  providers: [ApiSvc],
})
export class RealTimeProceedingsSearchPage {
  @ViewChild('dateTime') dateTime;
  realTimeList: any;
  realTimeHearingList: any;
  realTimeTitle: any;
  realTimePageForm = {};
  hearingBench: {};
  hearingType: {};
  judgeNameList: {};
  judgeNameList1: {};
  additionalJudgeNameList: {};
  additionalJudgeNameList1: {};
  casesArr = {};
  submitAttampt: boolean = false;
  today: number = Date.now();
  msg: any = msg;
  jsonData: boolean = false;
  public displayDiv = false;
  public displayGrid = false;
  apiErr: boolean = false;
  benchList: {};
  default: {};
  hearingDefault: {};
  hearingBenchDefault: {};
  judgeListDefault: {};
  additionalJudgeListDefault: {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public FormBuilder: FormBuilder, private apisvc: ApiSvc) {

    //bench
    this.default = { 'id': '0' };
    this.hearingDefault = { 'hearingBenchType': 'Select bench type' };
    this.hearingBenchDefault = { 'id': '0' };
    this.judgeListDefault = { 'id': '0' };
    this.additionalJudgeListDefault = { 'id': '0' };
    if (global.getBenchData == '') {
      this.apisvc.getData("bench", true, true).subscribe(res => {
        global.getBenchData = res.data;
        this.benchList = res.data;

      },
        err => { this.apisvc.failure(err); this.apiErr = true; }
      );
    }
    else {
      this.benchList = global.getBenchData;

    }
    //benchType
    if (global.benchType == '') {
      this.apisvc.getData("hearingBenchType", true, false).subscribe(res => {
        this.hearingType = res.data;
        global.benchType = res.data;

      },
        err => { this.apisvc.failure(err); this.apiErr = true; }
      );
    } else {
      this.hearingType = global.benchType;
    }
    this.realTimePageForm = FormBuilder.group({
      bench: ['', Validators.compose([Validators.required])],
      hearingBenchType: ['', Validators.compose([Validators.required])],
      hearingBench: ['', Validators.compose([Validators.required])],
      member: [''],
      judgeName1: ['']
    });
  }
  ngOnInit(): void {
    console.log('ngOnInit initilized!');
  }
  realTimePageSubmit(form: any): void {

    if (form.valid) {
      console.log("Case form Submit", form.form.value);
    } else {
      console.log("Case form no Submit", this.casesArr);
    }
  };
  // search result
  checkConnection(formData) {

    var realTimeData = formData;

    if (global.networkFlag != "false") {

      if (realTimeData.bench == '0') {
        realTimeData.bench = '';
      }
      if (realTimeData.hearingBenchType == '0') {
        realTimeData.hearingBenchType = 'Select bench type';
      }
      if (realTimeData.hearingBench == '0') {
        realTimeData.hearingBench = '';
      }
      if (realTimeData.member == '0') {
        realTimeData.member = '';
      }
      if (realTimeData.judgeName1 == '0') {
        realTimeData.judgeName1 = '';
      }
      // search
      this.apisvc.postData("benchProcessingSearchResult", realTimeData).subscribe(res => {
        let data: any = res;
         if (data && data.isSuccess == "true") {
            if (data.data.length == "0") {
          this.displayGrid = false;
          this.displayDiv = true;
          return;
        }
        if (this.displayDiv = true) {
          this.displayDiv = false;
        }

        this.displayGrid = true;
        this.realTimeList = data.data[0].judgeList;
        this.realTimeHearingList = data.data[0].appealType;
         }else{
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
  // hearing bench
  getHearingBench(value) {
    var benchInfo = value;

    this.apisvc.postData("hearingBenchReg", benchInfo).subscribe(res => {
      this.hearingBench = res.data;

    }, err => {
      this.apisvc.failure(err); this.apiErr = true;
      console.log("failure");
    });
  };
  // member
  getJudgeList(value) {
    var formInfo = value;

    this.apisvc.postData("judgeList", formInfo).subscribe(res => {
      this.judgeNameList = res.data[0].memberList;
      this.judgeNameList1 = res.data[1].memberList;

    }, err => {
      this.apisvc.failure(err); this.apiErr = true;
      console.log("failure");
    });
  }
  // member
  getAdditionalJudgeList(value) {
    var formInfo = value;

    this.apisvc.postData("judgeListAdditional", formInfo).subscribe(res => {
      this.additionalJudgeNameList = res.data[0].memberList;
      this.additionalJudgeNameList1 = res.data[1].memberList;

    }, err => {
      this.apisvc.failure(err); this.apiErr = true;
      console.log("failure");
    });
  }
  validateForm(bench, benchType, hearingBench) {
    if (bench == '0' || benchType == '0' || hearingBench == '0') {
      return true;
    }
    else {
      return false;
    }
  };
  enableOption(bench, hearingBenchType) {
    if (bench == '0' || hearingBenchType == 'Select bench type') {
      return true;
    } else {
      return false;
    }
  };
  // show hide dropdown
  showItem(hearingBenchType, hearingBench) {
    if ((hearingBenchType == 'Functional' && hearingBench != '0')) {
      return false;
    } else {
      return true;
    }
  };
  showItem1(hearingBenchType, hearingBench) {
    if ((hearingBenchType == 'Functional' && hearingBench != '0')) {
      if (hearingBench == '1') {
        return true;
      }
      return false;
    } else {
      return true;
    }
  };
  enableAndOption(value) {
    if (value == '0') {
      return true;
    } else {
      return false;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RealTimeProceedingsSearchPage');
  }

}
