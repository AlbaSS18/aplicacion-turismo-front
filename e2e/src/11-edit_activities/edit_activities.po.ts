import {by, element} from 'protractor';

export class EditActivitiesPage {

  navigateTo() {
    return element(by.id('activities_nav'));
  }

  getButtonEditOfFirstRowOfTable(n: number){
    return element.all(by.xpath('//*[contains(@class, "p-datatable-tbody")]/tr[1]/td[6]/button')).get(n);
  }

  getEditActivityBtn() {
    return element(by.id('editActivityBtn'));
  }

  getFieldNameActivity(){
    return element(by.id('field-name'));
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

  getErrorMessageImage(){
    return element(by.css('.p-message-summary'));
  }

}
