import {by, element} from 'protractor';

export class ListActivitiesEvaluatePage {

  navigateTo() {
    return element(by.id('activities_evaluate_nav'));
  }

  getDataviewWithActivitiesEvaluate(){
    return element(by.css('.p-dataview-list'));
  }

  getDropdownToSort(){
    return element(by.xpath('//p-dropdown[@inputid="dropdown_sort_activities_valued"]'));
  }

  getOptionDropdown(text){
    return element(by.cssContainingText('.p-dropdown-item', text));
  }

  getLabelDropdown(){
    return element(by.css('.p-dropdown-label'));
  }

  getEmptyMessage(){
    return element(by.css('.p-dataview-emptymessage'));
  }

  getInputSearchActivity(){
    return element(by.id('input_search_activities_evaluate'));
  }
}
