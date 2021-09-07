import { Component, OnInit } from '@angular/core';
// subjekti on observablen erikoistyyppi, joka voi sekä vastaanottaa että
// lähettää datavirtaa.
import { Observable, Subject } from 'rxjs';
// rxjs:n operaattoreita, joilla voidaan säädellä datavirtaa.
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css'],
})
export class HeroSearchComponent implements OnInit {
  /*
  Tietoa ei oteta ulos observablesta luokassa, vaan tieto otetaan 
  ulos vasta templaatissa. $-merkki kertoo, että muuttujassa on observable.
  */
  heroes$: Observable<Hero[]>;
  // luodaan subjekti, jota tarvitaan reaktiivisessa haussa.
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    // subjekti vastaanottaa hakutermin
    this.searchTerms.next(term);
  }

  /*
Tässä on kaksi reaktiivista streamia 1) näppäimistösyöte 2) sankarit, jotka tulevat
palvelimelta
  */

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      // http-pyyntöjä tehdään korkeintaan 300ms välein
      debounceTime(300),

      // ignore new term if same as previous term
      // ei tehdä uutta hakua, jos termi ei ole muuttunut
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // vaihdaliitos vaihtaa palvelimelta tulevaan streamiin, jolla saadaan
      // haetut sankarit.
      switchMap((term: string) => this.heroService.searchHeroes(term))
    );
  }
}
