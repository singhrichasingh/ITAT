import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController} from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { msg } from '../../app/app.configuration.ts';
import { ApiSvc } from '../../providers/api-svc';
import { global } from '../../app/global';
import { CaseDetailsPage } from '../../pages/case-details/case-details';

@Component({
  selector: 'page-tribunal-orders',
  templateUrl: 'tribunal-orders.html',
  providers: [ApiSvc]
})
export class TribunalOrdersPage {
  @ViewChild('dateTime1') dateTime1;
  @ViewChild('dateTime2') dateTime2;
  @ViewChild('dateTime3') dateTime3;

  count: number = 0;
  items = [];
  msg: any = msg;
  tribunalSearchList: any = [];
  item: any = [];
  tribunalPageForm: any = {};
  casesArr = {};
  submitAttampt: boolean = false;
  public displayGrid = false;
  public displayDiv = false;
  apiErr: boolean = false;
  benchList: {};
  appealType: {};
  authorList: {};
  authorList1: {};
  default: {};
  appealTyprDefault: {};
  authorDefault: {};
  year: any;
  month: any;
  dt: any;
  year1: any;
  month1: any;
  dt1: any;
  year2: any;
  month2: any;
  dt2: any;
  loader: any = null;  
  summary : any;
  obj : any;
  appeal : any;
  getBench : any;
  getAppeal : any;
  author : any;
  author1 : any;
  getAuthor : any;
  getAuthor1 : any;
  dataPost : any;
  pageCount : number;
  showMore: boolean = true;
  // page api call
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public FormBuilder: FormBuilder, private apisvc: ApiSvc, public loadingCtrl: LoadingController) {

    //bench
    this.default = { 'id': '0' };
    this.appealTyprDefault = { 'id': '0' };
    this.authorDefault = { 'id': '0' };
    // bench
    if (global.getBenchData == '') {
      this.apisvc.getData("bench", true, true).subscribe(res => {

        this.benchList = res.data;
        global.getBenchData = res.data;
        this.getBench = res.data;
      },
        err => { this.apisvc.failure(err); this.apiErr = true; }
      );
    } else {
      this.benchList = global.getBenchData;
      this.getBench = global.getBenchData;      
    }
    //appealType
    if (global.appealList == '') {
      this.apisvc.getData("appealType", true, false).subscribe(res => {

        this.appealType = res.data;
        global.appealList = res.data;
        this.getAppeal = res.data;
      },
        err => { this.apisvc.failure(err); this.apiErr = true; }
      );
    } else {
      this.appealType = global.appealList;
      this.getAppeal = global.appealList;      
    }



    this.tribunalPageForm = FormBuilder.group({
      bench: ['', Validators.compose([Validators.required])],
      appealType: [''],
      assesseeName: [''],
      // authorTribunalOrder: [''],
      hearingDate: [''],
      pronouncedOn: [''],
      orderDate: ['']
    });
  }
  ngOnInit(): void {
    console.log('ngOnInit initilized!');
  }
  tribunalPageFormSubmit(form: any): void {

    if (form.valid) {
      console.log("Case form Submit", form.form.value);
    } else {
      console.log("Case form no Submit", this.casesArr);
    }
  };

  createSummary(){
     this.obj = this.getBench.find(o => o.id === this.summary.bench);
    console.log("here i am ////", this.obj);
    this.appeal = this.getAppeal.find(p => p.id === this.summary.appealType);
    console.log("here i am a////", this.appeal);
    // this.author = this.getAuthor.find(q => q.id === this.summary.authorTribunalOrder);
    // console.log("here i am a>>>"+ JSON.stringify(this.author));     
    // this.author1 = this.getAuthor1.find(r => r.id === this.summary.authorTribunalOrder);    
    // console.log("here i am a<<<<<"+ JSON.stringify(this.author1));    
    
  }
  // search result
  checkConnection(formData) {
    this.items = [];
    this.count = 0;
    var hearingDate = (<HTMLInputElement>document.getElementById("hearingDate")).value;
    var pronouncedOn = (<HTMLInputElement>document.getElementById("pronouncedOn")).value;    
    var orderDate = (<HTMLInputElement>document.getElementById("orderDate")).value;  
    console.log("dates1", hearingDate);
    console.log("dates2", pronouncedOn);
    console.log("dates3", orderDate);
    formData.hearingDate = hearingDate;
    formData.pronouncedOn = pronouncedOn;
    formData.orderDate = orderDate;
    this.summary = formData;
    this.createSummary();
    console.log("form data is", formData);
    this.dataPost = formData;
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
    this.dataPost.hearingDate = this.dt+ '/' +this.month+ '/' +this.year;

    var dateString1 = formData.pronouncedOn;
    var getDate1 = Date.parse(dateString1);
    var today1 = new Date(getDate1);
    this.year1 = today1.getFullYear();
    this.month1 = today1.getMonth() + 1;
    this.dt1 = today1.getDate();
    if (this.dt1 < 10) {
      this.dt1 = '0' + this.dt1;
    }
    if (this.month1 < 10) {
      this.month1 = '0' + this.month1;
    }
    this.dataPost.pronouncedOn = this.dt1+ '/' +this.month1+ '/' +this.year1;

    var dateString2 = formData.orderDate;
    var getDate2 = Date.parse(dateString2);
    var today2 = new Date(getDate2);
    this.year2 = today2.getFullYear();
    this.month2 = today2.getMonth() + 1;
    this.dt2 = today2.getDate();
    if (this.dt2 < 10) {
      this.dt2 = '0' + this.dt2;
    }
    if (this.month2 < 10) {
      this.month2 = '0' + this.month2;
    }
    this.dataPost.orderDate = this.dt2+ '/' +this.month2+ '/' +this.year2;


    if (global.networkFlag != "false") {
      if (this.dataPost.bench == '0') {
        this.dataPost.bench = '';
      }
      if (this.dataPost.appealType == '0') {
        this.dataPost.appealType = '';
      }
      // if (this.dataPost.authorTribunalOrder == '0') {
      //   this.dataPost.authorTribunalOrder = '';
      // }
      if (this.dataPost.hearingDate == "NaN/NaN/NaN") {
        this.dataPost.hearingDate = '';
      }
      if (this.dataPost.pronouncedOn == "NaN/NaN/NaN") {
        this.dataPost.pronouncedOn = '';
      }
      if (this.dataPost.orderDate == "NaN/NaN/NaN") {
        this.dataPost.orderDate = '';
      }
      this.pageCount = 1;
      this.dataPost.st_limit = this.pageCount;
      console.log("form data is final is>>>>>>>>>>", this.dataPost);
      // search
      let loader;
      loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();
      this.apisvc.postData("tribunalOrders", this.dataPost).subscribe(res => {
        console.log("res is", res);
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
          this.tribunalSearchList = data.data;
          if(this.tribunalSearchList.length < 100){
            this.showMore = false;
          }
            for (let i = 0; i < this.tribunalSearchList.length; i++) {  // here you can limit the items according to your needs.
              this.items.push(this.tribunalSearchList[this.count]);   // your JSON data which you want to display
              this.count++ //i am using a count variable to keep track of inserted records to avoid inserting duplicate records on infinite scroll
            }
        // }
        } else {
          this.displayGrid = false;
          this.displayDiv = true;
        }

        loader.dismiss();       
      }, err => {
        loader.dismiss();
        this.apisvc.failure(err); this.apiErr = true;
        console.log("failure", err);
      });
    } else {
      this.apisvc.connectionHandle();
    }
  }

  presentAlert(dataNew) {
    let alert = this.alertCtrl.create({
      title: 'Low battery',
      subTitle: dataNew,
      buttons: ['Dismiss']
    });
    alert.present();
  }
  doInfinite() {
    console.log('Begin async operation', this.pageCount);
    this.count = 0;
    this.pageCount = this.pageCount + 100;
    this.dataPost.st_limit = this.pageCount ;
    console.log("next page data", this.dataPost);
    let loader;
    loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.apisvc.postData("tribunalOrders", this.dataPost).subscribe(res => {
      console.log("res is", res);
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
        this.tribunalSearchList = data.data;
        console.log("response23322432", this.tribunalSearchList);
          for (let i = 0 + this.pageCount; i < this.tribunalSearchList.length + this.pageCount; i++) {  // here you can limit the items according to your needs.
            this.items.push(this.tribunalSearchList[this.count]);   // your JSON data which you want to display
            this.count++ //i am using a count variable to keep track of inserted records to avoid inserting duplicate records on infinite scroll
          }
          console.log("arrray data", this.items);
      // }
      } else {
        this.displayGrid = false;
        this.displayDiv = true;
      }

      loader.dismiss();       
    }, err => {
      loader.dismiss();
      this.apisvc.failure(err); this.apiErr = true;
      console.log("failure", err);
    });

    // setTimeout(() => {
    //   for (let i = 0; i < 20; i++) {   
    //     this.items.push(this.tribunalSearchList[this.count]); // this will start pushing next 5 items
    //     this.count++
    //   }
  
    //   infiniteScroll.complete();
    // }, 500);
  }

  tribunalAuthor(value) {
    var benchId = value;
    console.log("value is" + JSON.stringify(benchId));
    // author
    let loader;
    loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.apisvc.postData("author", benchId).subscribe(res => {

      this.authorList = res.data[0].memberList;
      this.authorList1 = res.data[1].memberList;
      this.getAuthor = res.data[0].memberList;
      this.getAuthor1 = res.data[1].memberList;
      console.log("author list"+ JSON.stringify(this.authorList));
      console.log("author list"+ JSON.stringify(this.authorList1));
      
      loader.dismiss();
    }, err => {
      loader.dismiss();
      this.apisvc.failure(err); this.apiErr = true;
      console.log("failure");
    });
  };
  validateForm(value) {
    if (value == '0' || value == null) {
      return true;
    } else {
      return false;
    }
  };
  enableOption(bench, appeal) {
    if (bench == '0' || appeal == '0') {
      return true;
    } else {
      return false;
    }
  };
  ionViewDidLoad() {
    console.log('ionViewDidLoad TribunalOrdersPage');
  }

  loadDeatils(id, filedby){
    console.log("id is", id)
    this.navCtrl.push(CaseDetailsPage, {"param1" : id, "param2" : filedby});
  }
  resetForm(val) {
    this.displayGrid = false; 
    this.tribunalPageForm.reset();
    console.log("curr val", this.tribunalPageForm.value);
    this.items = [];
    (<HTMLInputElement>document.getElementById("hearingDate")).value = '';
    (<HTMLInputElement>document.getElementById("pronouncedOn")).value = '';    
    (<HTMLInputElement>document.getElementById("orderDate")).value = '';  
   
    this.validateForm(val);
    this.displayDiv = false;

  }
}
