import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TribunalBenchesPage } from './tribunal-benches';

@NgModule({
  declarations: [
    // TribunalBenchesPage,
  ],
  imports: [
    IonicPageModule.forChild(TribunalBenchesPage),
  ],
  exports: [
    // TribunalBenchesPage
  ]
})
export class TribunalBenchesPageModule {}
