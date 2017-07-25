import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  /** ヒーローリスト */
  heroes: Hero[] = [];

  /**
   * コンストラクタ
   */
  constructor(private heroService: HeroService) { }

  /**
   * 初期化
   */
  ngOnInit(): void {
    // APIからヒーロー一覧取得
    this.heroService.getHeroes()
        .then(heroes => this.heroes = heroes.slice(1, 5));
  }
}
