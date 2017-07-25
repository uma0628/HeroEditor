import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location }                 from '@angular/common';

import 'rxjs/add/operator/switchMap';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;

  /**
   * コンストラクタ
   */
  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  /**
   * 初期化
   */
  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) =>
        this.heroService.getHero(+params.get('id')))
            .subscribe(hero => this.hero = hero);
  }

  /**
   * 保存します
   */
  save(): void {
    this.heroService.update(this.hero)
                    .then(() => this.goBack());
  }

  /**
   * 戻る
   */
  goBack() : void {
    this.location.back();
  }

}
