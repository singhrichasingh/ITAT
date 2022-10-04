import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AboutPresidentPage } from './about-president';

@NgModule({
  declarations: [
    // AboutPresidentPage,
  ],
  imports: [
    IonicPageModule.forChild(AboutPresidentPage),
  ],
  exports: [
    // AboutPresidentPage
  ]
})
export class AboutPresidentPageModule {}
