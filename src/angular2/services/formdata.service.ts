import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/combineLatest';

import {ITodo} from '.././interfaces/todo.interface';
import {IState} from '.././interfaces/state.interface';

/**
 * @class FormDataService
 */
@Injectable()
export class FormDataService {
  private visibilityFilterDispatcher: BehaviorSubject<string>;
  private todoDispatcher: BehaviorSubject<ITodo[]>;
  private state: Observable<IState>;
  private currentTodos: ITodo[];

  constructor() {
    this.visibilityFilterDispatcher = new BehaviorSubject('SHOW_ALL');
    this.todoDispatcher = new BehaviorSubject([]);
    this.currentTodos = [];

    this.state = Observable.combineLatest(
      this.visibilityFilterDispatcher,
      this.todoDispatcher,
      (visibilityFilter, todos) => {
        return {
          visibilityFilter,
          todos,
        };
      }
    );

    this.state.subscribe((currState: IState) => {
      console.log('State Change'); console.log(currState);
      this.currentTodos = currState.todos;
    });
  }

  public getTodoDispatcher(): BehaviorSubject<ITodo[]> {
    return this.todoDispatcher;
  }

  public getVisibilityFilterDispatcher(): BehaviorSubject<string> {
    return this.visibilityFilterDispatcher;
  }

  public getCurrentTodos(): ITodo[] {
    return this.currentTodos;
  }

  public getState(): Observable<IState> {
    return this.state;
  }
}
