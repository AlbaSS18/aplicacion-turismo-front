import {browser, by, element} from 'protractor';

export class ListUserPage {

  navigateTo(){
    return element(by.id('list_user_nav'));
  }

  tableUser(){
    return element(by.css('.user-panel .user-container .table-user'));
  }

  getInputSearchUser(){
    return element(by.id('input_search_user_table'));
  }

  getTableRows(){
    return element.all(by.css('.table-user tbody tr'));
  }

  getDeleteUserBtn(){
    return element(by.id('delete_user_btn'));
  }

  getConfirmDialog(){
    return element(by.css('p-confirmdialog .p-confirm-dialog'));
  }

  getButtonRemove(){
    return element(by.css('.p-dialog-footer .p-confirm-dialog-accept'));
  }

  getDeleteUserBtnWithTextSpecifyc(){
    return element(by.xpath('//td[contains(text(), "newUser@email.com")]/following-sibling::*[3]/button[2]'));
  }
}
