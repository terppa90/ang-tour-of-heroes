import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'; // Hero -tietotyyppi
import { HEROES } from '../mock-heroes';

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

  heroes = HEROES; // Kaikki sankarit taulukosta

  selectedHero: Hero;

  constructor() {}

  ngOnInit(): void {}

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
