import {LoginPage} from './login.po';
import {browser} from 'protractor';

describe('01-login component', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('should display a message when user is not correct', () => {
    page.getInputPasswordForm().sendKeys('1234567');
    page.getInputEmailForm().sendKeys('error@email.com');

    page.getLoginBtn().click();
    browser.sleep(1000);
    page.getMessageError().isPresent().then(
      (result) => {
        expect(result).toEqual(true);
      }
    );
  });

  it('should can login with user with ROLE_USER', () => {
    page.getInputPasswordForm().sendKeys('1234567');
    page.getInputEmailForm().sendKeys('luis@email.com');
    page.getLoginBtn().click();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'recommendationMap');
    expect(page.getNav('recommendation_map_nav').isPresent()).toEqual(true);
    expect(page.getNav('activities_evaluate').isPresent()).toEqual(true);
    expect(page.getNav('list_user_nav').isPresent()).toEqual(false);
    expect(page.getNav('list_city_nav').isPresent()).toEqual(false);
    expect(page.getNav('activities_nav').isPresent()).toEqual(false);
    expect(page.getNav('interest_nav').isPresent()).toEqual(false);
    expect(page.getNav('interest_nav').isPresent()).toEqual(false);
  });

  it('should can logout', () => {
    page.getNavDropdownToLogOut().click();
    page.getDropdownItem(3).click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'login');
  });

  it('should can login with user with ROLE_ADMIN', () => {
    page.getInputPasswordForm().sendKeys('1234567');
    page.getInputEmailForm().sendKeys('admin@email.com');
    page.getLoginBtn().click();

    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'user');
    expect(page.getNav('recommendation_map_nav').isPresent()).toEqual(true);
    expect(page.getNav('activities_evaluate').isPresent()).toEqual(true);
    expect(page.getNav('list_user_nav').isPresent()).toEqual(true);
    expect(page.getNav('list_city_nav').isPresent()).toEqual(true);
    expect(page.getNav('activities_nav').isPresent()).toEqual(true);
    expect(page.getNav('interest_nav').isPresent()).toEqual(true);
    expect(page.getNav('interest_nav').isPresent()).toEqual(true);
  });
});
