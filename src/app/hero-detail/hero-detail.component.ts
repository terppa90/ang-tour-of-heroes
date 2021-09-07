import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router'; // tarvitaan hakemaan osoiteriviltä urlista id
import { Location } from '@angular/common'; // tarvitaan siirtymään yksi näkymä eteen/taakse
import { HeroService } from '../hero.service'; // tarvitaan hakemaan sankari kun tiedetään id

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}
  // kun komponentti syntyy muistiin, sankarin tiedot tulevat komponenttiin id:n perustella
  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    // id tulee reitistä merkkijonona, pitää muuntaa numeroksi, voidaan tehdä + operaattorilla
    const id = +this.route.snapshot.paramMap.get('id');
    //const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  goBack(): void {
    this.location.back();
  }
  // päivittää sankarin ja menee suoraan listanäkymään, jossa päivitetty sankari näkyy
  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
}
