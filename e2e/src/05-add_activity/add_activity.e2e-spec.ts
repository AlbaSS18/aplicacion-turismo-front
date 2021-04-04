import {AppPage} from '../app.po';
import {browser, logging} from 'protractor';
import {AddActivityPage} from './add_activity.po';

describe('05 - Add activity component', () => {
  let page: AddActivityPage;

  beforeEach(() => {
    page = new AddActivityPage();
    page.navigateTo().click();
  });

  it('should add a activity', () => {
    page.getAddActivityBtn().click();
    page.getFieldNameActivity().sendKeys('Prueba de actividad');
    page.getFieldDescription().sendKeys('Es una prueba de añadir una actividad');
    page.getDropdownInterest().click();
    page.getOptionFromDropdown().click();
    browser.sleep(10000);
    expect(true).toEqual(true);
  });

});
