import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';
 
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { HeroSearchService } from '../hero-search.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
  providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {

  /** ヒーロー？ */
  heroes: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  /**
   * コンストラクタ
   */
  constructor(
    private HeroSearchService: HeroSearchService,
    private router: Router
  ) { }

  /**
   * 検索？
   * @param term 
   */
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /**
   * 初期化
   */
  ngOnInit(): void {
    this.heroes = this.searchTerms
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap(term => term
          ? this.HeroSearchService.search(term)
          : Observable.of<Hero[]>([]))
        .catch(error => {
          console.error(error);
          return Observable.of<Hero[]>([]);
        });
  }

  /**
   * 詳細へ
   * @param hero 
   */
  gotoDetail(hero: Hero): void {
    let link = ['/detail', hero.id];
    this.router.navigate(link);
  }

}
