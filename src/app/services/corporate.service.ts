import { Injectable } from '@angular/core';
import { Leader, Leaders } from '../shared';
import _bindAll from 'lodash/bindAll';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CorporateService {
  constructor() {
    _bindAll(this, ['getLeaders', 'getFeaturedLeader']);
  }
  getLeaders(): Observable<Leader[]> {
    return of(Leaders).pipe(delay(2000));
  }
  getFeaturedLeader(): Observable<Leader> {
    return of(Leaders.filter(leader => leader.featured)[0]).pipe(delay(2000));
  }
}
