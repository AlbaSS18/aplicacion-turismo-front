import {by, element} from 'protractor';

export class ListCitiesPage{

  navigateTo() {
    return element(by.id('list_city_nav'));
  }
}
