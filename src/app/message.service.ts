import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  // Taulukko johon tulee viestejä siitä mitä sovelluksessa tapahtuu
  // eli tämä on lokikirja.
  messages: string[] = [];
  // Lisätään tietoa lokitaulukkoon
  add(message: string) {
    this.messages.push(message);
  }
  // Putsaa lokin tyhjäksi
  clear() {
    this.messages = [];
  }
}
