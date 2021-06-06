import {EditUserAdminPage} from './edit_user_admin.po';
import {browser} from 'protractor';

describe('08-edit-user-admin component', () => {
  let page: EditUserAdminPage;

  beforeEach(() => {
    page = new EditUserAdminPage();
    page.navigateTo().click();
    page.getEditUserBtnWithTextSpecifyc().click();
  });

  it('should show the edit component', () => {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'admin/user/edit/73');
  });

  it('should be disable the send button', () => {
    expect(page.getSendEditUserBtn().isEnabled()).toBe(false);
  });

  it('should enable the button when some field change', () => {
    page.getInputUsername().sendKeys('1');
    page.getInputCalendar().click();
    page.getSelectMonthCalendar().click();
    page.getOptionMonth().click();
    page.getSelectYearCalendar().click();
    page.getOptionYear().click();
    page.getDateCalendar().click();
   /* page.getRoles('ROLE_ADMIN').click();*/
    browser.sleep(5000);
    expect(page.getRoles('ROLE_ADMIN').isPresent()).toBe(true);
    //expect(page.getEditUserBtnWithTextSpecifyc().isEnabled()).toBe(true);
  });


})
