import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagListComponent implements OnInit {

  @Input() navFormat: boolean;
  @Input() tags: any[];

  constructor() {
    this.navFormat = false;
  }

  ngOnInit() {

  }

  onTagClick(tag: string, e) {
    e.stopPropagation();
  }
}
