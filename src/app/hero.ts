/*
Rajapintaluokka Hero määrittää millainen sankarin täytyy olla.
Hero-tyyppisellä oliolla on pakko olla id joka on numero ja name joka on 
merkkijono. Tämä on sovelluksen modelin eli tietomallin osa. Varsinainen
data muodostaa loput modelista.
*/

export interface Hero {
  id: number;
  name: string;
}
