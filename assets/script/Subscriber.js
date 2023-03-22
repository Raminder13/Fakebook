'use strict';

/* 
Raminder Singh
*/

class Subscriber extends User {
  #pages;
  #groups;
  #canMonetize;

  constructor(pages, groups, canMonetize) {
    this.#pages = pages;
    this.#groups = groups;
    this.#canMonetize = canMonetize;
  }

  get pages() {
    this.#pages;
  }

  get groups() {
    return this.#groups;
  }

  get canMonetize() {
    return this.#canMonetize;
  }
}

export { Subscriber };
