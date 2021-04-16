import {browser, by, element} from 'protractor';

export class AddActivityPage {

  navigateTo() {
    return element(by.id('activities_nav'));
  }

  getAddActivityBtnInTable(){
    return element(by.css('p-toolbar .p-toolbar-group-right button'));
  }

  getFieldNameActivity(){
    return element(by.id('field-name-Activity'));
  }

  getFieldDescription(){
    return element(by.id('field-description'));
  }

  getDropdownInterest(){
    return element(by.id('field-interest'));
  }

  getOptionFromDropdown(){
    return element(by.cssContainingText('p-dropdownitem','Playas'));
  }

  getGeocoderButton(){
    return element(by.css('.leaflet-top.leaflet-right .leaflet-control-geocoder-icon'));
  }

  getGeocoderInput(){
    return element(by.css('.leaflet-top.leaflet-right .leaflet-control-geocoder-expanded .leaflet-control-geocoder-form input'));
  }

  getAddActivityBtn(){
    return element(by.css('#addActivityBtn button'));
  }

  getDeleteActivityBtnWithTextSpecifyc(){
    return element(by.xpath('//td[contains(text(), "Prueba de actividad")]/following-sibling::*[4]/button[3]'));
  }

  getTrWithNewActivity(){
    return element(by.xpath('//td[contains(text(), "Prueba de actividad")]'));
  }

  getButtonRemoveFromDialog(){
    return element(by.css('.p-dialog-footer .p-confirm-dialog-accept'));
  }

  getButtonInfoOfFirstRowOfTable(n: number){
    return element.all(by.xpath('//*[contains(@class, "p-datatable-tbody")]/tr[1]/td[6]/button')).get(n);
  }

  getPanelWithActivityInfo(text){
    return element(by.cssContainingText('.content-container', text));
  }

  getDropdownEdit(){
    return element(by.id('field-name'));
  }
}
