import {Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import * as _ from 'lodash';
import {Store} from '@ngrx/store';
import {ApplicationState} from '../../../store/application-state';
import {Observable} from 'rxjs/Observable';
import {repositoriesSelector} from '../../../store/selectors/repositories.selector';
import {AddRepositoriesAction, RemoveRepositoriesAction, UpdateRepositoriesAction} from '../../../store/actions';
@Component({
  selector: 'app-repositories-section',
  templateUrl: './repositories-section.component.html',
  styleUrls: ['./repositories-section.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoriesSectionComponent implements OnInit {

  repositories$: Observable<any>;
  @Output()
  onRepositoriesUpdate: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  onClose: EventEmitter<boolean> = new EventEmitter<boolean>();

  showForm: boolean;
  sectionWidth: string = '350px';
  newRepository: any = {};
  constructor(
    private store: Store<ApplicationState>
  ) {
    this.repositories$ = store.select(repositoriesSelector);
  }

  ngOnInit() {
  }

  updateRepository(updatedRepository) {
    this.store.dispatch(new UpdateRepositoriesAction(updatedRepository))
  }

  saveRepository(newRepository) {
    this.showForm = false;
    this.store.dispatch(new AddRepositoriesAction(newRepository));
  }

  removeRepository(repository) {
    this.store.dispatch(new RemoveRepositoriesAction(repository))
  }

  toggleRepositorySelection(updatedRepository) {
    this.store.dispatch(new UpdateRepositoriesAction(updatedRepository))
  }

  close() {
    this.onClose.emit(true)
  }

  toggleForm() {

    this.sectionWidth = this.showForm ? '350px' : '600px';
    this.showForm = !this.showForm;
  }
}
