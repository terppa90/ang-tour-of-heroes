import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'; // Hero -tietotyyppi
//import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  // hero on nyt olio, jolla on Hero -tyyppi. Tämä on TS:ssää.
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  };

  //heroes = HEROES; // Kaikki sankarit taulukosta

  heroes: Hero[];

  //selectedHero: Hero;

  /*
heroService on olio, joka syntyy HeroService -luokasta
konstruktori-injektiossa. Tämä on dependency injection eli 
riippuvuuden injektio. Ideana on liittää service ja komponentti
toisiinsa "löyhästi", niin että service voidaan tarvittaessa 
helposti vaihtaa toiseen.
*/

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  // tämä on metodi, joka suoritetaan automaattisesti aina kun
  // komponentti syntyy muistiin
  ngOnInit(): void {
    // sankarit haetaan aina kun komponentti syntyy muistiin
    this.getHeroes();
  }
  /*
  onSelect(hero: Hero): void {
    
    //Kun valitsemme sankarin, lähtee viesti messageservicen kautta
    //messagekomponenttiin, jossa viesti esitetään.
    
    //this.selectedHero = hero;
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`); // tässä yhdistetään merkkijono ja muuttuja
    // perinteinen tapa yhdistää merkkijono ja muuttuja:
    // 'HeroesComponent: Selected hero id='+hero.id
  }
  */
  /*
getHeroes hakee sankarit servicestä tähän komponenttiin. 
HUOM! Toinen getHeroes, jota kutsutaan tämän metodin sisällä
on eri metodi, sillä se on heroServicen metodi.

servicen getHeroes tilaa (subscribe) observablen, josta saadaan
tieto (heroes-talukko) ulos callbackilla.

Tieto tulee reaktiivisesti.
*/
  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  add(name: string): void {
    name = name.trim(); // ottaa pois tyhjät välilyönnit
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero).subscribe((hero) => {
      // tyypinmuunnos Hero-tyyppiseksi ^
      this.heroes.push(hero); // lisätään sankari heti käyttöliittymään
    });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter((h) => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }
}
