import {by, element} from 'protractor';

export class ListInterestPage {


  navigateTo() {
    return element(by.id('interest_nav'));
  }

  listInterest(){
    return element(by.css('.p-virtualscroller .p-component'));
  }

  getAddInterestBtn(){
    return element(by.id('add_interest_btn'));
  }

  getNameInput(idInput){
    return element(by.id(idInput));
  }

  getErrorMessage(message){
    return element(by.cssContainingText('.p-error', message));
  }

  getCancelInterestBtn(idBtn){
    return element(by.id(idBtn));
  }

  getSaveInterestBtn(idBtn){
    return element(by.id(idBtn));
  }

  getDeleteBtn(){
    return element(by.xpath('//div[@class="interest-details" and ./b[contains(text(),"Museos")]]/following-sibling::*[1]/button[2]'));
  }

  getDeleteMessage(message){
    return element(by.cssContainingText('.p-confirm-dialog-message', message));
  }

  getCloseBtnConfirmDialog(){
    return element(by.css('.p-dialog-header-close'));
  }

  getEditButton(){
    return element(by.xpath('//div[@class="interest-details" and ./b[contains(text(),"Museos")]]/following-sibling::*[1]/button[1]'));
  }
}
