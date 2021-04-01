import {browser, by, element} from 'protractor';
import {By} from '@angular/platform-browser';

export class LoginPage {

  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getInputEmailForm(){
    return element(by.id('float-input-email'));
  }

  getInputPasswordForm(){
    return element(by.id('float-input-password'));
  }

  getMessageError(){
    return element(by.id('message_error_login'));
  }

  getLoginBtn(){
    return element(by.id('login_btn'));
  }

  getNavDropdownToLogOut(){
    return element(by.id('navbarDropdownUserProfile'));
  }

  getDropdownItem(n: number){
    return element(by.css('.dropdown-menu > a:nth-child(' + n + ')'));
  }

}
