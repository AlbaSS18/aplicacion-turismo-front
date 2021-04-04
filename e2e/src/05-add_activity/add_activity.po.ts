import {browser, by, element} from 'protractor';

export class AddActivityPage {

  navigateTo() {
    return element(by.id('activities_nav'));
  }

  getAddActivityBtn(){
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
}
