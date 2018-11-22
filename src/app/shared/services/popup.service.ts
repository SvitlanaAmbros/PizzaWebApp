import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  public popups: any[] = [];

  constructor() { }

  // add (popup: any) {
  //   this.popups.push(popup);
  // }

  // remove (id: string) {
  //   this.popups = this.popups.filter(el => el.id != id);
  // }

  public generateId() {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let idSize = 7;
    let key = '';

    for (let i = 0; i < idSize; i++) {
      key += getRandomInt(0, 9);
    }

    return key;
  }
 
}
