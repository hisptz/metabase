import { Component, OnInit } from '@angular/core';
import {ApplicationState} from "../../../store/application-state";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {errorMessageSelector} from "../../../store/selectors/error-messege.selector";
import {ClearMessageAction} from "../../../store/actions";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  message$: Observable<string>;
  constructor(private store: Store<ApplicationState>) {
    this.message$ = store.select(errorMessageSelector)
  }

  ngOnInit() {

  }

   close() {
     this.store.dispatch(new ClearMessageAction())
   }

   reload() {
     window.location.reload();
   }

}
