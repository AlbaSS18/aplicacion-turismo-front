import {browser, by, element, Key, logging} from 'protractor';
import {AddActivityPage} from './add_activity.po';
import * as path from 'path';

describe('05 - Add activity component', () => {
  let page: AddActivityPage;

  beforeEach(() => {
    page = new AddActivityPage();
    page.navigateTo().click();
    page.getAddActivityBtnInTable().click();
  });

  it('should show the activity component', () => {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'activities/add');
  });

  it('should be disable the button', () => {
    expect(page.getAddActivityBtn().isEnabled()).toEqual(false);
  });

  it('should add a activity', () => {
    page.getFieldNameActivity().sendKeys('Prueba de actividad');
    page.getFieldDescription().sendKeys('Es una prueba de añadir una actividad');
    page.getDropdownInterest().click();
    page.getOptionFromDropdown().click();
    page.getGeocoderButton().click();
    page.getGeocoderInput().sendKeys(Key.chord('calle corrida gijon asturias', Key.ENTER));
    var absolutePath = path.resolve(__dirname, '../../../src/assets/teste2e/user.png');
    element(by.css('input[type="file"]')).sendKeys(absolutePath);
    expect(page.getAddActivityBtn().isEnabled()).toEqual(true);
  });

  it('should display a message error when file upper 2MB', () => {
    var absolutePath = path.resolve(__dirname, '../../../src/assets/teste2e/imgUpper2.jpg');
    element(by.css('input[type="file"]')).sendKeys(absolutePath);
    expect(page.getErrorMessageImage()).toEqual('Tamaño inválido del archivo: imgUpper2.jpg');
  });
});
