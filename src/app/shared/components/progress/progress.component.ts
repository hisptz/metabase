import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';
import {ApplicationState} from '../../../store/application-state';
import {Store} from '@ngrx/store';
import {progressMessagesSelector} from '../../../store/selectors/progress-messages.selector';
import * as _ from 'lodash';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  @Input() totalItems: number = 0;
  progress: string;
  loadedItems: number = 0;
  constructor(private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    console.log(this.totalItems, this.loadedItems)
    this.store.select(progressMessagesSelector).subscribe(progressMessages => {
      if (progressMessages.length > 0) {
        this.loadedItems = progressMessages.length;
        this.progress = _.last(progressMessages).message;
        if(this.loadedItems === this.totalItems) {
          this.totalItems = 0;
        }
      }
    })
  }

  calculateProgress(loaded,total) {
    return total == 0 ? 0 :((loaded/total)*100).toFixed(0)
  }

}
