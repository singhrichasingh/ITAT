import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController, AlertController} from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpModule } from '@angular/http'; 
import 'rxjs/add/operator/map';
import { FormBuilder, Validators } from '@angular/forms';
import { msg } from '../../app/app.configuration.ts';
import { ApiSvc } from '../../providers/api-svc';
import { ModalContentView } from '../../modals/modal-content';
import { global } from '../../app/global';
import { Injectable } from '@angular/core';
import { CaseDetailsPage } from '../../pages/case-details/case-details';
import { DatePicker } from '@ionic-native/date-picker';

/*
  Generated class for the CaseStatus page.
*/

@Injectable()
@Component({
  selector: 'page-case-status',
  templateUrl: 'case-status.html',
  providers: [ApiSvc]
})
export class CaseStatusPage {
  benchList: {};
  appealList: {};
  yearList: {};
  caseStatusList: any = [];
  caseStatusDetail: any = [];
  casesArr = {};
  casesForm: any = {};
  submitAttempt: boolean = false;
  apiErr: boolean = false;
  isFormShow = false;
  viewSwitch = "Up";
  fixClass = null;
  msg: any = msg;
  app;
  default: {};
  defaultYear: {};
  defaultAppeal: {};
  public displayDiv = false;
  public displayGrid = false;
  year: any;
  month: any;
  dt: any;
  today: number = Date.now();
  loader: any = null;
  myDate: String = new Date().toISOString();
  summary : any;
  getBench : any; 
  obj : any;
  getAppeal : any;
  appeal : any;
  constructor(public modalCtrl: ModalController, private alertCtrl: AlertController,
    public datePicker: DatePicker, public apisvc: ApiSvc, public navCtrl: NavController, public navParams: NavParams, public http: Http, private formBuilder: FormBuilder, public loadingCtrl: LoadingController) {


    this.default = { 'id': '0' };
    this.defaultYear = { 'year': 'Select filling year' };
    this.defaultAppeal = { 'id': '0' };

    this.casesForm = formBuilder.group({
      bench: ['', Validators.compose([Validators.required])],
      appealType: ['', Validators.compose([Validators.required])],
      appealNumber: [''],
      filingYear: [''],
      filedOn: [''],
      assesseeName: ['']
    });
  }

  // model page
  // presentContactModal(id) {
  //   console.log(id);
  //   var appealId = { "id": '' };
  //   appealId.id = id;

  //   this.apisvc.postData("caseStatusDetail", appealId).subscribe(data => {
  //     this.caseStatusDetail = data;
  //     console.log("case data", this.caseStatusDetail);
  //     this.sendData(id, this.caseStatusDetail);
  //   }, err => {
  //     this.apisvc.failure(err); this.apiErr = true;
  //     console.log("failure");
  //   });


  // }
picker(){
  this.datePicker.show({
    date: new Date(),
    mode: 'date',
    androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
  }).then(
    date => console.log('Got date: ', date),
    err => console.log('Error occurred while getting date: ', err)
  );
}
  presentContactModal(id, filledby){
    this.navCtrl.push(CaseDetailsPage, {"param1" : id, "param2" : filledby });
  }
  sendData(id, modelData) {

    let testObj = { data: modelData };
    let contactModal = this.modalCtrl.create(ModalContentView, testObj);
    contactModal.present();
  }

  ngOnInit(): void {
    console.log('ngOnInit initilized!');

  }

  //Form subimmit event
  caseSubmit(form: any): void {
    console.log("Case Submit", form);
    if (form.valid) {

      console.log("Case Submit", form.form.value);
    } else {
      console.log("Case no Submit", this.casesArr);
    }
  };

  ionViewDidLoad() {
    console.log('ionViewDidLoad CaseStatusPage');

    //bench
    if (global.getBenchData == '') {
      this.apisvc.getData("bench", true, false).subscribe(res => {

        this.benchList = res.data;
        this.getBench = res.data;
        global.getBenchData = res.data;
        console.log("????", this.getBench);
      },
        err => { this.apisvc.failure(err); this.apiErr = true; }
      );
    } else {
      this.benchList = global.getBenchData;
      this.getBench = global.getBenchData;
    }
    //appeal
    if (global.appealList == '') {
      this.apisvc.getData("appeal", true, false).subscribe(res => {

        this.appealList = res.data;
        this.getAppeal = res.data;
        global.appealList = res.data;
        console.log("fkdsj", this.getAppeal);
      },
        err => { this.apisvc.failure(err); this.apiErr = true; }
      );
    }
    else {
      this.appealList = global.appealList;
      this.getAppeal = global.appealList;
    }
    //year
    if (global.fillingYear == '') {
      this.apisvc.getData("fillingYear", true, false).subscribe(res => {

        this.yearList = res.data;
        global.fillingYear = res.data;

      },
        err => { this.apisvc.failure(err); this.apiErr = true; }
      );
    } else {
      this.yearList = global.fillingYear;
    }
  }
  createSummary(){
    // for(var i=0; i<this.benchList.length; i++)
     this.obj = this.getBench.find(o => o.id === this.summary.bench);
    console.log("here i am ////", this.obj);
    this.appeal = this.getAppeal.find(p => p.id === this.summary.appealType);
    console.log("here i am a////", this.appeal);
    
  }
  // search result
  checkConnection(formData) {
    console.log(">>>>>>", formData);
    this.summary = formData;
    this.createSummary();
// var newDate = document.getElementById("filedOn");
var newDate = (<HTMLInputElement>document.getElementById("filedOn")).value;
formData.filedOn = newDate;
console.log("form data is>>>", formData);
console.log("date is", newDate);
    if (global.networkFlag != "false") {  
      var formDataPost = formData;
      var dateString = formDataPost.filedOn;
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
      formDataPost.filedOn = this.year + '-' + this.month + '-' + this.dt;
      // formDataPost.filedOn = this.dt + '/' + this.month + '/' + this.year;
      if (formDataPost.appealType == '0') {
        formDataPost.appealType = ''
      }
      if (formDataPost.filingYear == 'Select filling year') {
        formDataPost.filingYear = '';
      }
      if (formDataPost.filedOn == 'NaN-NaN-NaN') {
        formDataPost.filedOn = '';
      }
      console.log("\n\n\nform data is:-----------", formDataPost)
      // search
      let loader;
      loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      this.apisvc.postData("caseStatusSearchResult", formDataPost).subscribe(res => {
        let data: any = res;
        if (data && data.isSuccess == "true") {


          if (data.data.length == "0") {
            this.displayGrid = false;
            this.displayDiv = true;
          }
          else {
            if (this.displayDiv = true) {
              this.displayDiv = false;
            }
            this.displayGrid = true;
            this.caseStatusList = data.data;
            
            console.log("case data is", this.caseStatusList);
          }
        } else {
          this.displayGrid = false;
          this.displayDiv = true;
          let alert = this.alertCtrl.create({
            title: 'Warning',
            subTitle: data.responseMessage,
            buttons: ['OK']
          });
          alert.present();
        }
        loader.dismiss();
      }, err => {
        loader.dismiss();
        this.apisvc.failure(err); this.apiErr = true;
        console.log("failure");
      });
    } else {
      this.apisvc.connectionHandle();
    }
  }

  showGrid() {
    this.isFormShow == true ? this.isFormShow = false : this.isFormShow = true;
    this.isFormShow == true ? this.viewSwitch = "Filter" : this.viewSwitch = "Up";
    this.isFormShow == true ? this.fixClass = { 'scrollfix': true } : this.fixClass = { 'scrollfix': false }
  }
  validateForm(bench, appealType) {
    //console.log("val"+bench+" "+appealType);
    // console.log(bench+" "+appealType);
    if (bench == '0' || appealType == '0' || bench == null || appealType == null) {
      return true;
    } else {
      return false;
    }
  }
  resetForm(bench, appealType) {
    this.casesForm.reset();
    this.validateForm(bench, appealType);
    this.displayDiv = false;
    this.displayGrid = false;
    this.apiErr = false;
    (<HTMLInputElement>document.getElementById("filedOn")).value = '';
  }
}

