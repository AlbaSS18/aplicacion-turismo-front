import {browser, by, element} from 'protractor';

export class EditUserPage {

  navigateTo(): Promise<unknown> {
    return browser.get('http://localhost:4200/users') as Promise<unknown>;
  }

  getInputEmailForm(){
    return element(by.id('float-input-email'));
  }

  getInputPasswordForm(){
    return element(by.id('float-input-password'));
  }

  getLoginBtn(){
    return element(by.id('login_btn'));
  }

  getDropdownItem(n: number){
    //return element(by.css('.dropdown-menu > a:nth-child(' + n + ')'));
    return element(by.css('#navbarSupportedContent > ul.navbar-nav.ml-auto > div > li > div > a:nth-child(1)'));
  }

  getNavDropdownToLogOut(){
    return element(by.id('navbarDropdownUserProfile'));
  }

  getSendEditUserBtn(){
    return element(by.id('edit_user_profile_btn'));
  }

  getInputUsername(){
    return element(by.id('username'));
  }

  getRadioButton(n: number){
    return element(by.id('four' + n));
  }

  getInputCalendar(){
    return element(by.id('age'));
  }

  getSelectMonthCalendar(){
    return element(by.css('.p-datepicker-month'));
  }

  getOptionMonth(){
    return element(by.cssContainingText('option', 'Enero'));
  }

  getSelectYearCalendar(){
    return element(by.css('.p-datepicker-year'));
  }

  getOptionYear(){
    return element(by.cssContainingText('option', '1995'));
  }

  getErrorMessage(classMessage){
    return element(by.css(classMessage));
  }

  getDateCalendar(){
    return element.all(by.css('tbody tr td span'))
      .get(6);
  }

}
