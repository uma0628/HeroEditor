import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
  /** アクセス先URL */
  private heroesUrl = 'api/heroes';
  /** ヘッダ */
  private headers = new Headers({'Content-Type': 'application/json'});

  /**
   * コンストラクタ
   * @param http 
   */
  constructor(private http: Http) { }

  /**
   * ヒーロー一覧取得
   */
  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
                    .toPromise()
                    .then(response => response.json() as Hero[])
                    .catch(this.handleError);
  }

  /**
   * 
   * @param id ヒーロー取得
   */
  getHero(id: number) : Promise<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
                    .toPromise()
                    .then(response => response.json() as Hero)
                    .catch(this.handleError);
  }

  /**
   * ヒーローを更新
   * @param hero 
   */
  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
                .toPromise()
                .then(() => hero)
                .catch(this.handleError);
  }

  /**
   * ヒーロー作成
   * @param name 
   */
  create(hero: Hero): Promise<Hero> {
    return this.http
              .post(this.heroesUrl, JSON.stringify(hero), {headers: this.headers})
              .toPromise()
              .then(res => res.json() as Hero)
              .catch(this.handleError);
  }

  /**
   * 
   * @param id ヒーローを削除
   */
  delete(id: number): Promise<void> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete(url, {headers: this.headers})
                .toPromise()
                .then(() => null)
                .catch(this.handleError);
  }

  /**
   * エラーハンドリング
   * @param error 
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred(エラー発生)', error);
    return Promise.reject(error.message || error);
  }

}
