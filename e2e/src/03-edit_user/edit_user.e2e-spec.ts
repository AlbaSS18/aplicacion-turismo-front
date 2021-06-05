import {AppPage} from '../app.po';
import {browser, Key, logging} from 'protractor';
import {EditUserPage} from './edit_user.po';

describe('03 - Edit user page', () => {
  let page: EditUserPage;

  beforeEach(() => {
    page = new EditUserPage();
    page.getNavDropdownToLogOut().click();
    page.getDropdownItem(1).click();
  });

  it('should be disabled the send button', () => {
    expect(page.getSendEditUserBtn().getAttribute('ng-reflect-disabled')).toBe('true');
  });

  it('should display error message when inputs are empty', () => {
    page.getInputUsername().sendKeys(Key.chord(Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE));
    for (let i = 0; i < 10; i++){
      page.getInputCalendar().sendKeys(Key.chord(Key.BACK_SPACE));
    }
    expect(page.getErrorMessage('.message_error_username').isPresent()).toBe(true);
    expect(page.getErrorMessage('.message_error_age').isPresent()).toBe(true);
  });

  it('should enable the button when some field change', () => {
    page.getInputUsername().sendKeys('1');
    page.getInputCalendar().click();
    page.getSelectMonthCalendar().click();
    page.getOptionMonth().click();
    page.getSelectYearCalendar().click();
    page.getOptionYear().click();
    page.getDateCalendar().click();
    page.getRadioButton(0).click();
    page.getRadioButton(1).click();
    page.getRadioButton(2).click();
    expect(page.getSendEditUserBtn().getAttribute('ng-reflect-disabled')).toBe('false');
  });

});
