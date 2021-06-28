import {by, element} from 'protractor';

export class TableActivitiesPage {

  navigateTo() {
    return element(by.id('activities_nav'));
  }

  tableActivities(){
    return element(by.css('.table-activities'));
  }

  getDeleteActivityBtnWithTextSpecifyc(){
    return element(by.xpath('//td[contains(text(), "Campo de San Francisco")]/following-sibling::*[4]/button[3]'));
  }

  getDeleteMessage(message){
    return element(by.cssContainingText('.p-confirm-dialog-message', message));
  }

  getCloseBtnConfirmDialog(){
    return element(by.css('.p-dialog-header-close'));
  }

  getButtonInfoOfFirstRowOfTable(n: number){
    return element.all(by.xpath('//*[contains(@class, "p-datatable-tbody")]/tr[1]/td[6]/button')).get(n);
  }

  getPanelWithActivityInfo(text){
    return element(by.cssContainingText('.content-container', text));
  }

  getNameFirstRow(){
    return element.all(by.xpath('//*[contains(@class, "p-datatable-tbody")]/tr[1]/td[2]')).get(0);
  }

  getInputSearchActivity(){
    return element(by.id('input_search_activities_table'));
  }

  getTableRows(){
    return element.all(by.css('.table-activities tbody tr'));
  }

  getCloseBtnDynamicDialog(){
    return element(by.css('.p-dialog-header-icon'));
  }

}
