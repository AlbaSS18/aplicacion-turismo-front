import {by, element} from 'protractor';

export class ListCitiesPage{

  navigateTo() {
    return element(by.id('list_city_nav'));
  }

  listCities(){
    return element(by.css('.p-virtualscroller .p-component'));
  }

  getAddCityBtn(){
    return element(by.id('add_city_btn'));
  }

  getNameInput(idInput){
    return element(by.id(idInput));
  }

  getErrorMessage(message){
    return element(by.cssContainingText('.p-error', message));
  }

  getSaveCityBtn(idBtn){
    return element(by.id(idBtn));
  }

  getCancelCityBtn(idBtn){
    return element(by.id(idBtn));
  }

  getDeleteBtn(){
    return element(by.xpath('//div[@class="city-details" and ./b[contains(text(),"Oviedo")]]/following-sibling::*[1]/button[2]'));
  }

  getDeleteMessage(message){
    return element(by.cssContainingText('.p-confirm-dialog-message', message));
  }

  getEditButton(){
    return element(by.xpath('//div[@class="city-details" and ./b[contains(text(),"Oviedo")]]/following-sibling::*[1]/button[1]'));
  }

  getCloseBtnConfirmDialog(){
    return element(by.css('.p-dialog-header-close'));
  }

}
