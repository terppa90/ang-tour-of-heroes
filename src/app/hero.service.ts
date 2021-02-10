import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes'; // data serviceen
// dekoraattori eli annotaatio kertoo että service voidaan
// injektoida eli liittää komponenttiin
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  // messageService -olio syntyy tähän komponenttiin
  constructor(private messageService: MessageService) {}
  // getHeroes palauttaa Observablen, jossa on taulukko
  // joka sisältää Hero-tyyppisiä olioita
  // tässä tehdään observable itse of-operaattorilla
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }
  // yksittäisen sankarin haku
  getHero(id: number): Observable<Hero> {
    // TODO: send the message _after_ fetching the hero
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find((hero) => hero.id === id)); // haetaan sankari id:n perusteella
  }
}
