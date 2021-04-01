import {LoginPage} from './login.po';
import {browser} from 'protractor';

describe('01-login component', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  xit('should display a message when user is not correct', () => {
    page.getInputPasswordForm().sendKeys('1234567');
    page.getInputEmailForm().sendKeys('error@email.com');

    page.getLoginBtn().click().then(
      () => {
        browser.sleep(20000);
      }
    );
    browser.sleep(1000);
    page.getMessageError().isPresent().then(
      (result) => {
        expect(result).toEqual(true);
      }
    );
  });

  it('should can login with admin user', () => {
    page.getInputPasswordForm().sendKeys('1234567');
    page.getInputEmailForm().sendKeys('admin@email.com');
    page.getLoginBtn().click();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'user');
  });

  it('should can logout', () => {
    page.getNavDropdownToLogOut().click();
    page.getDropdownItem(3).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'login');
  });
});
