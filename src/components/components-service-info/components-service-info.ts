import { Component, Input } from '@angular/core';
/**
 * Generated class for the ComponentsNoRecordComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'service-info',
  templateUrl: 'components-service-info.html'
})
export class ComponentsServiceInfoComponent {
  @Input() isShow = true;
  @Input() msg = null;
  @Input() whichIcon:string = "information-circle";
  @Input() iconColor:string = "yellow"
    constructor() {
   // console.log('No Record Directive Created');
  }
}
