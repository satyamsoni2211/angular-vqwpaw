import { Injectable } from '@angular/core';
import { Promotion, PROMOTIONS } from '../shared';
import _bindAll from 'lodash';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  constructor() {
    _bindAll(this, ['getPromotions', 'getPromotion', 'getFeaturedPromotion']);
  }
  getPromotions(): Observable<Promotion[]> {
    return of(PROMOTIONS).pipe(delay(2000));
  }

  getPromotion(id: string): Observable<Promotion> {
    return of(PROMOTIONS.filter(promo => promo.id === id)[0]).pipe(delay(2000));
    // return of().pipe(delay(2000)).toObservable;
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return of(PROMOTIONS.filter(promotion => promotion.featured)[0]).pipe(
      delay(2000)
    );
  }
}
