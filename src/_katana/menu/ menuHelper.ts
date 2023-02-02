import { BehaviorSubject, Subject } from 'rxjs';
export class MenuHelper {
  static event = new Subject<null | string>();
}
