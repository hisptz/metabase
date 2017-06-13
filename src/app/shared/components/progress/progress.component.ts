import {Component, OnInit, Input, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  @Input() totalItems: number = 0;
  @Input() loadedItems: number = 0;
  @Input() progress: string = 'Loading..';
  constructor() { }

  ngOnInit() {
  }

  calculateProgress(loaded,total) {
    return total == 0 ? 0 :((loaded/total)*100).toFixed(0)
  }

}
