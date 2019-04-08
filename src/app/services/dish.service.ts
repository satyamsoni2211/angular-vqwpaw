import { Injectable } from '@angular/core';
import { DishDetail, Dishes } from '../shared';
import _bindAll from 'lodash/bindAll';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DishService {
  constructor() {
    _bindAll(this, ['getDishes', 'getDish', 'getFeaturedDish']);
  }
  /**
   * @returns object returns dishes array
   */
  getDishes(): Observable<DishDetail[]> {
    return of(Dishes).pipe(delay(2000));
  }
  /**
   *
   * @param id [string] id for the string
   * @returns [DishDetail]
   */
  getDish(id: string): Observable<DishDetail> {
    return of(Dishes.filter(dish => dish.id === id)[0]).pipe(delay(2000));
  }
  getFeaturedDish(): Observable<DishDetail> {
    return of(Dishes.filter(dish => dish.featured)[0]).pipe(delay(2000));
  }
  getDishIds(): Observable<string[] | any> {
    return of(Dishes).pipe(
      delay(2000),
      map(dishes => dishes.map(d => d.id))
    );
  }
}
