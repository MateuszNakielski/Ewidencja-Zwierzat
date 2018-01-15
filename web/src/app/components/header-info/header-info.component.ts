import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header-info',
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.scss']
})
export class HeaderInfoComponent implements OnInit {

  path: string;
  @Input() headerWidth;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.path = this.route.snapshot.data['path'];
  }

  doZarzadzania() {
    this.router.navigate(['/zarzadzanie-zwierzetami']);
  }

}
