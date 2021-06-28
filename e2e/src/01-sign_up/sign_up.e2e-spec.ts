import {browser, Key, logging} from 'protractor';
import {SignUpPage} from './sign_up.po';

describe('01 - Sign Up Page', () => {
  let page: SignUpPage;

  beforeEach(() => {
    page = new SignUpPage();
    page.openPage();
    page.navigateTo().click();
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

  it('should display a message when email is repeated', () => {
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
    page.getRadioButton(0).click();
    page.getRadioButton(1).click();
    page.getRadioButton(2).click();
    page.getContinueBtn().click();
    expect(page.getMessageEmailRepeated().isPresent()).toBe(true);
  });

  it('should display the error message', () => {
    page.getInputName().sendKeys(Key.chord('a', Key.BACK_SPACE));
    expect(page.getMessage('El nombre de usuario es obligatorio').isPresent()).toBe(true);

    page.getInputEmail().sendKeys(Key.chord('a', Key.BACK_SPACE));
    expect(page.getMessage('El email es obligatorio').isPresent()).toBe(true);

    page.getInputCalendar().sendKeys(Key.chord('a', Key.BACK_SPACE));
    expect(page.getMessage('La fecha de nacimiento es obligatoria').isPresent()).toBe(true);

    page.getInputPassword().sendKeys(Key.chord('a', Key.BACK_SPACE));
    expect(page.getMessage('La contraseña es obligatoria').isPresent()).toBe(true);

  });
});
