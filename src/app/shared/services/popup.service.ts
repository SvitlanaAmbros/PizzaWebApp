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

  public generateId ( pref ) {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let idSize = 5;
    let key = `${pref}-`;

    for (let i = 0; i < idSize; i++) {
      key += getRandomInt(1, 5);
    }

    return key;
  };
 
}
