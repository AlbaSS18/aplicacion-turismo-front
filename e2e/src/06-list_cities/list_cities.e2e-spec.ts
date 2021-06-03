import {ListCitiesPage} from './list_cities.po';

describe('06 - List cities component', () => {
  let page: ListCitiesPage;

  beforeEach(() => {
    page = new ListCitiesPage();
    page.navigateTo().click();
  });



});
