import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
})
export class SubHeaderComponent implements OnInit {
  buttons = [
    { icon: 'home', path: '/jud3' },
    { icon: 'star', path: '/treejs' },
    { icon: 'dataset', path: '/sand' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  changeRoute(button) {
    this.router.navigate([button.path]);
  }
}
