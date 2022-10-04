import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseDetailsPage } from './case-details';

@NgModule({
  declarations: [
    // CaseDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseDetailsPage),
  ],
  exports: [
    // CaseDetailsPage
  ]
})
export class CaseDetailsPageModule {}
