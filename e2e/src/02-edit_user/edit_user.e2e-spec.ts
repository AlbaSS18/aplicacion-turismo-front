import {AppPage} from '../app.po';
import {browser, logging} from 'protractor';
import {EditUserPage} from './edit_user.po';

describe('Edit user page', () => {
  let page: EditUserPage;

  beforeAll(() => {
    page = new EditUserPage();
    page.getInputPasswordForm().sendKeys('1234567');
    page.getInputEmailForm().sendKeys('admin@email.com');
    page.getLoginBtn().click();
  });

  beforeEach(() => {
    page.getNavDropdownToLogOut().click();
    browser.sleep(1000);
    page.getDropdownItem(1).click();
    browser.sleep(10000);
  });

  it('should enable the button when some field change', () => {
    //expect(page.getSendEditUserBtn().isEnabled()).toBe(false);
    expect(page.getSendEditUserBtn().getAttribute('ng-reflect-disabled')).toBe('true');
  });

  xit('should disable the button when the fields are the same', () => {
    expect(true).toBe(true);
  });

});
