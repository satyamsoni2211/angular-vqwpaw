import { Component, OnInit } from '@angular/core';
import { DishDetail, Promotion, Leader } from '../shared';
import { DishService, PromotionService, CorporateService } from '../services';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dish: DishDetail;
  promotion: Promotion;
  leader: Leader;
  constructor(
    private dishService: DishService,
    private promotionService: PromotionService,
    private corporateService: CorporateService
  ) {}

  ngOnInit() {
    this.dishService.getFeaturedDish().subscribe(dish => (this.dish = dish));
    this.promotionService
      .getFeaturedPromotion()
      .subscribe(promotion => (this.promotion = promotion));
    this.corporateService
      .getFeaturedLeader()
      .subscribe(leader => (this.leader = leader));
  }
}
