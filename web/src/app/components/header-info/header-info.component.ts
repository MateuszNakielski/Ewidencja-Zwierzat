import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-header-info',
  templateUrl: './header-info.component.html',
  styleUrls: ['./header-info.component.scss']
})
export class HeaderInfoComponent implements OnInit {

  path: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.path = this.route.snapshot.data['path'];
  }

}
