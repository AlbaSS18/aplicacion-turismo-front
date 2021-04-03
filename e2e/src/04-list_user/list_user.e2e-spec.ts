import {Key} from 'protractor';
import {ListUserPage} from './list_user.po';

describe('04 - List user component', () => {
  let page: ListUserPage;

  beforeEach(() => {
    page = new ListUserPage();
    page.navigateTo().click();
  });

  it('should display a table with users', () => {
    expect(page.tableUser().isPresent()).toBe(true);
  });

  it('should search a user that not exist', () => {
    page.getInputSearchUser().sendKeys('error@email.com');
    expect(page.getTableRows().count()).toBe(0);
    page.getInputSearchUser().clear();
    page.getInputSearchUser().sendKeys(Key.chord('w', Key.BACK_SPACE));
  });

  it('should delete a user', () => {
    page.getDeleteUserBtnWithTextSpecifyc().click();
    expect(page.getConfirmDialog().isPresent()).toBe(true);
    page.getButtonRemove().click();
    expect(page.getDeleteUserBtnWithTextSpecifyc().isPresent()).toBe(false);
  });


});
