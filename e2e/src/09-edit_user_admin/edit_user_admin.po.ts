import {by, element} from 'protractor';

export class EditUserAdminPage {

  navigateTo() {
    return element(by.id('list_user_nav'));
  }

  getEditUserBtnWithTextSpecifyc(){
    return element(by.xpath('//td[contains(text(), "alba@email.com")]/following-sibling::*[3]/button[1]'));
  }

  getSendEditUserBtn(){
    return element(by.id('edit_user_admin_btn'));
  }

  getInputUsername(){
    return element(by.id('float-input-username'));
  }

  getInputCalendar(){
    return element(by.id('float-input-birthday'));
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

  getDateCalendar(){
    return element.all(by.css('tbody tr td span'))
      .get(6);
  }

  getRoles(text){
    return element(by.xpath('//ul[@class="p-listbox-list"]/li[contains(@area-label,"ROLE_ADMIN")]'));
  }
}
