import {browser, by, element} from 'protractor';

export class AddActivityPage {

  navigateTo() {
    return element(by.id('activities_nav'));
  }

  getAddActivityBtnInTable(){
    return element(by.css('p-toolbar .p-toolbar-group-right button'));
  }

  getFieldNameActivity(){
    return element(by.id('field-name-add-activity'));
  }

  getFieldDescription(){
    return element(by.id('field-description-add-activity'));
  }

  getDropdownInterest(){
    return element(by.id('field-interest-add-activity'));
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

  getDropdownEdit(){
    return element(by.id('field-name'));
  }

  getErrorMessageImage(){
    return element(by.css('.p-message-summary')).getText();
  }
}
