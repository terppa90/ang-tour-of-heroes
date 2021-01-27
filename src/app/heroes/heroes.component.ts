import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero'; // Hero -tietotyyppi

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

  constructor() {}

  ngOnInit(): void {}
}
