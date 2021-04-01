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
}
