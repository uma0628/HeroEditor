import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  /** ヒーローリスト */
  heroes: Hero[];
  /** 選択したヒーロー */
  selectedHero: Hero;

  /**
   * コンストラクタ
   */
  constructor(
    private router: Router,
    private heroService: HeroService
  ) { }

  /**
   * 初期化
   */
  ngOnInit() {
    this.getHeroes();
  }

  /**
   * ヒーロー一覧取得
   */
  getHeroes(): void {
    this.heroService.getHeroes()
                    .then(heroes => this.heroes = heroes);
  }

  /**
   * ヒーロー選択イベント
   * @param hero
   */
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  /**
   * 詳細へ
   */
  gotoDatail(): void {
    this.router.navigate(['/detail', this.selectedHero.id]);
  }

  /**
   * 追加
   * @param name
   */
  add(id: number, name: string): void {
    name = name.trim();
    if (name) {} else {
      return;
    }
    if (id) {} else {
      return;
    }
    var inHero: Hero = new Hero;
    inHero.id = Number(id);
    inHero.name = name;
    this.heroService.create(inHero)
        .then(hero => {
          this.heroes.push(hero);
          this.selectedHero = null;
        });
  }

  /**
   * ヒーローを削除します
   * @param hero 
   */
  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
                    .then(() => {
                      this.heroes = this.heroes.filter(h => h !== hero);
                      if (this.selectedHero === hero) {
                        this.selectedHero = null;
                      }
                    });
  }
}
