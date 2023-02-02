import { BehaviorSubject, Subject } from 'rxjs';

export class Helper {
  static event = new Subject();
  static button = {
    key: new Subject(),
  };
}
