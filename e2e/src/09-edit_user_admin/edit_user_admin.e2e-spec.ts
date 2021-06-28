import {EditUserAdminPage} from './edit_user_admin.po';
import {browser, Key} from 'protractor';

describe('08-edit-user-admin component', () => {
  let page: EditUserAdminPage;

  beforeEach(() => {
    page = new EditUserAdminPage();
    page.navigateTo().click();
    page.getEditUserBtnWithTextSpecifyc().click();
  });

  it('should show the edit component', () => {
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'admin/user/edit/40');
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
    page.getRoles('ROLE_ADMIN').click();
    expect(page.getSendEditUserBtn().isEnabled()).toBe(true);
  });

  it('should display the error message', () => {
    page.getInputUsername().clear();
    page.getInputUsername().sendKeys(Key.chord('a', Key.BACK_SPACE));
    page.getInputCalendar().sendKeys(Key.chord(Key.BACK_SPACE));
    expect(page.getMessageError('El nombre de usuario es obligatorio').isPresent()).toBe(true);
    expect(page.getMessageError('La fecha de nacimiento es obligatoria').isPresent()).toBe(true);
  });


})
