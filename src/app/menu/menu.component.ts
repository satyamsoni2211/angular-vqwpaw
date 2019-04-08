import { Component, OnInit } from '@angular/core';
import _bindAll from 'lodash/bindAll';
import { DishDetail } from '../shared/Dish';
import { DishService } from '../services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dishes: Array<DishDetail>;
  selectedDish: DishDetail;
  constructor(private dishService: DishService) {
    _bindAll(this, ['selectDish']);
  }

  ngOnInit() {
    this.dishService.getDishes().subscribe(dishes => (this.dishes = dishes));
  }

  selectDish(elem) {
    this.selectedDish = elem;
  }
}
