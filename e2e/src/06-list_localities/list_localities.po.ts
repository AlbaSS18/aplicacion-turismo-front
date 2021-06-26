import {by, element} from 'protractor';

export class ListLocalitiesPage{

  navigateTo() {
    return element(by.id('list_city_nav'));
  }

  listLocality(){
    return element(by.css('.p-virtualscroller .p-component'));
  }

  getAddLocalityBtn(){
    return element(by.id('add_locality_btn'));
  }

  getNameInput(idInput){
    return element(by.id(idInput));
  }

  getErrorMessage(message){
    return element(by.cssContainingText('.p-error', message));
  }

  getSaveLocalityBtn(idBtn){
    return element(by.id(idBtn));
  }

  getCancelLocalityBtn(idBtn){
    return element(by.id(idBtn));
  }

  getDeleteBtn(){
    return element(by.xpath('//div[@class="locality-details" and ./b[contains(text(),"Oviedo")]]/following-sibling::*[1]/button[2]'));
  }

  getDeleteMessage(message){
    return element(by.cssContainingText('.p-confirm-dialog-message', message));
  }

  getEditButton(){
    return element(by.xpath('//div[@class="locality-details" and ./b[contains(text(),"Oviedo")]]/following-sibling::*[1]/button[1]'));
  }

  getCloseBtnConfirmDialog(){
    return element(by.css('.p-dialog-header-close'));
  }

}
