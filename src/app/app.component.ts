import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '@app/store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private store: Store<fromRoot.State>,
    private route: ActivatedRoute
  ) {
    // store.dispatch(new fromRoot.LoadUserAction());
    store.dispatch(new fromRoot.LoadPackageGroupsAction());
  }
}
