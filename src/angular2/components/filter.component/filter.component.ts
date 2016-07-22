import {Component} from '@angular/core';

import {FormDataService} from '../.././services/formdata.service';

@Component({
    providers: [],
    directives: [],
    selector: 'Filter',
    template: require('./filter.component.html'),
})

export class FilterComponent {
  private formDataService: FormDataService;

  constructor(formDataService: FormDataService) {
    this.formDataService = formDataService;
  }

 private setVisibilityFilter(filter: string): void {
     this.formDataService.getVisibilityFilterDispatcher().next(filter);
 }
}
