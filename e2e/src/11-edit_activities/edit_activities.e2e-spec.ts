import {EditActivitiesPage} from './edit_activities.po';
import {browser, by, element, Key} from 'protractor';
import * as path from "path";

describe('11 - Edit activities component', () => {

  let page: EditActivitiesPage;

  beforeEach(() => {
    page = new EditActivitiesPage();
    page.navigateTo().click();
    page.getButtonEditOfFirstRowOfTable(1).click();
  });

  it('should show the edit component', () => {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'activities/edit/102');
  });

  it('should be disable the button', () => {
    expect(page.getEditActivityBtn().isEnabled()).toEqual(false);
  });

  it('should edit the activity', () => {
    page.getFieldNameActivity().clear();
    page.getFieldNameActivity().sendKeys('Edit actividad');
    page.getFieldDescription().clear();
    page.getFieldDescription().sendKeys('Es una prueba de editar una actividad');
    page.getDropdownInterest().click();
    page.getOptionFromDropdown().click();
    page.getGeocoderButton().click();
    page.getGeocoderInput().sendKeys(Key.chord('calle corrida gijon asturias', Key.ENTER));
    var absolutePath = path.resolve(__dirname, '../../../src/assets/teste2e/user.png');
    element(by.css('input[type="file"]')).sendKeys(absolutePath);
    expect(page.getEditActivityBtn().isEnabled()).toEqual(true);
  });

  it('should display a message error when file upper 2MB', () => {
    var absolutePath = path.resolve(__dirname, '../../../src/assets/teste2e/imgUpper2.jpg');
    element(by.css('input[type="file"]')).sendKeys(absolutePath);
    expect(page.getErrorMessageImage().getText()).toEqual('Tamaño inválido del archivo: imgUpper2.jpg');
  });


})
