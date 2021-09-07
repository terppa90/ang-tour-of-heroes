import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes'; // data serviceen
// dekoraattori eli annotaatio kertoo että service voidaan
// injektoida eli liittää komponenttiin
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// rxjs:n operaattoreita joilla siepataan virhe ja tuotetaan viestejä reaktiivisen tapahtuman välillä
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  // vaihda tähän oikean palvelimen osoite, sitten kun siirryt käyttämään sitä
  private heroesUrl = 'api/heroes'; // URL to web api

  // määrittelee verkon yli kulkevan datan JSON-muotoiseksi
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // messageService -olio syntyy tähän komponenttiin
  // http-olion avulla tehdään pyyntöjä serverille
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  // getHeroes palauttaa Observablen, jossa on taulukko
  // joka sisältää Hero-tyyppisiä olioita
  // tässä tehdään observable itse of-operaattorilla
  // http-pyynnöt sisältävät metodin, jolla pyyntö tehdään.
  // yleisimmät metodit ovat: get, post, put ja delete.
  /** GET heroes from the server */
  getHeroes(): Observable<Hero[]> {
    // palauttaa sankaritaulukon observablessa
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      // pipe liittää metodeja getHeroes -metodin suorituksen perään
      // tap-operaattorilla voi tehdä toimenpiteitä observablesta saatavalle tiedolle
      // tässä ei tehdä toimenpiteitä vaan ainoastaan loggaus
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
  // yksittäisen sankarin haku
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap((x) =>
        x.length
          ? this.log(`found heroes matching "${term}"`)
          : this.log(`no heroes matching "${term}"`)
      ),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  // yksinkertaisempi virheenkäsittely
  private handleErr(error: any): Observable<any> {
    console.error('Tapahtui virhe: ', error);
    return error.message || error;
  }
}
