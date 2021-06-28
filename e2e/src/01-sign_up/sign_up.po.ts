import {browser, by, element} from 'protractor';

export class SignUpPage {

  openPage(){
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }
  navigateTo() {
    return element(by.css('.right-container a'));
  }

  getInputName(){
    return element(by.id('field-name'));
  }

  getInputEmail(){
    return element(by.id('field-email'));
  }

  getInputPassword(){
    return element(by.id('field-password'));
  }

  getInputPasswordRepeat(){
    return element(by.id('field-password-repeat'));
  }

  getInputCalendar(){
    return element(by.id('field-birth'));
  }

  getSelectMonthCalendar(){
    return element(by.css('.p-datepicker-month'));
  }

  getOptionMonth(){
    return element(by.cssContainingText('option', 'Diciembre'));
  }

  getSelectYearCalendar(){
    return element(by.css('.p-datepicker-year'));
  }

  getOptionYear(){
    return element(by.cssContainingText('option', '1998'));
  }

  getDateCalendar(){
    return element.all(by.css('tbody tr td span'))
      .get(6);
  }

  getContinueBtn(){
    return element(by.css('.button_signup'));
  }

  getReturnBtn(){
    return element(by.css('.button_return'));
  }

  getRadioButton(n: number){
    return element(by.id('four' + n));
  }

  getMessageSuccessLogin(){
    return element(by.css('p-messages .p-messages'));
  }

  getMessageEmailRepeated(){
    return element(by.cssContainingText('.p-inline-message-text', 'Ya existe ese email'));
  }

  getMessage(message){
    return element(by.cssContainingText('.p-inline-message-text', message));
  }
}
