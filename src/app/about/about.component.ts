import { Component, OnInit } from '@angular/core';
import { CorporateService } from '../services';
import { Leader } from '../shared';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  leaders: Leader[];
  constructor(private corporateService: CorporateService) {}

  ngOnInit() {
    this.corporateService
      .getLeaders()
      .subscribe(leaders => (this.leaders = leaders));
  }
}
