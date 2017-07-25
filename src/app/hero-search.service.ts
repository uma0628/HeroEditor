import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Hero } from './hero';

@Injectable()
export class HeroSearchService {

  /**
   * コンストラクタ
   */
  constructor(private http: Http) { }

  /**
   * 検索します
   * @param term 
   */
  search(term: string): Observable<Hero[]> {
    return this.http
                .get(`api/heroes/?name=${term}`)
                .map(response => response.json() as Hero[]);
  }
}
