import {AppPage} from '../app.po';
import {browser, logging} from 'protractor';
import {SignUpPage} from './sign_up.po';

describe('02 - Sign Up Page', () => {
  let page: SignUpPage;

  beforeAll(() => {
    page = new SignUpPage();
    page.navigateTo().click();
  })

  beforeEach(() => {
    page = new SignUpPage();
  });

  it('should add a new user', () => {
    page.getInputName().sendKeys('newUser');
    page.getInputEmail().sendKeys('newUser@email.com');
    page.getInputPassword().sendKeys('1234567');
    page.getInputPasswordRepeat().sendKeys('1234567');
    page.getInputCalendar().click();
    page.getSelectMonthCalendar().click();
    page.getOptionMonth().click();
    page.getSelectYearCalendar().click();
    page.getOptionYear().click();
    page.getDateCalendar().click();
    page.getContinueBtn().click();
    expect(page.getReturnBtn().isPresent()).toBe(true);
    page.getRadioButton(0).click();
    page.getRadioButton(1).click();
    page.getRadioButton(2).click();
    page.getContinueBtn().click();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'login');
    expect(page.getMessageSuccessLogin().isPresent()).toBe(true);
  });

  it('should display a message when ', () => {

  });
});
