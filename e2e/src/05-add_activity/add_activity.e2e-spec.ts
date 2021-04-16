import {AppPage} from '../app.po';
import {browser, by, element, Key, logging} from 'protractor';
import {AddActivityPage} from './add_activity.po';
import * as path from 'path';

xdescribe('05 - Add activity component', () => {
  let page: AddActivityPage;

  beforeEach(() => {
    page = new AddActivityPage();
    page.navigateTo().click();
  });

  it('should add a activity', () => {
    page.getAddActivityBtnInTable().click();
    expect(page.getAddActivityBtn().isEnabled()).toEqual(false);
    page.getFieldNameActivity().sendKeys('Prueba de actividad');
    page.getFieldDescription().sendKeys('Es una prueba de añadir una actividad');
    page.getDropdownInterest().click();
    page.getOptionFromDropdown().click();
    page.getGeocoderButton().click();
    page.getGeocoderInput().sendKeys(Key.chord('calle corrida gijon asturias', Key.ENTER));
    var absolutePath = path.resolve(__dirname, '../../../src/assets/images/user.png');
    element(by.css('input[type="file"]')).sendKeys(absolutePath);
    page.getAddActivityBtn().click();
    expect(page.getTrWithNewActivity().isPresent()).toBe(true);
  });

  it('should remove a activity', () => {
    page.getDeleteActivityBtnWithTextSpecifyc().click();
    page.getButtonRemoveFromDialog().click();
    expect(page.getTrWithNewActivity().isPresent()).toBe(false);
  });

  it('should see more info about an activity', () => {
    var textFirstRow = element(by.xpath('//*[contains(@class, "p-datatable-tbody")]/tr[1]/td[1]')).getText();
    page.getButtonInfoOfFirstRowOfTable(0).click();
    browser.sleep(10000);
    expect(page.getPanelWithActivityInfo(textFirstRow).isPresent()).toBe(true);
  });

  it('should edit an activity with success', () => {
    page.getButtonInfoOfFirstRowOfTable(1).click();
    browser.sleep(10000);
  });
});
