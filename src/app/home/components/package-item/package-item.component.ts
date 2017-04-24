import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-package-item',
  templateUrl: './package-item.component.html',
  styleUrls: ['./package-item.component.css']
})
export class PackageItemComponent implements OnInit {

  @Input() packageItemData: any;
  selectedVersion: number;
  constructor() { }

  ngOnInit() {
  }

}
