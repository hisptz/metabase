import { Component } from '@angular/core';
import {Constants} from "./shared/constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  application_url: string;
  constructor(private constants: Constants) {
    this.application_url = this.constants.root_dir;
  }
}
