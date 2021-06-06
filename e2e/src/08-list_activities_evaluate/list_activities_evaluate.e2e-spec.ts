import {ListActivitiesEvaluatePage} from './list_activities_evaluate.po';
import {browser} from 'protractor';

describe('08 - List activities evaluate component', () => {

  let page: ListActivitiesEvaluatePage;

  beforeEach(() => {
    page = new ListActivitiesEvaluatePage();
    page.navigateTo().click();
  });

  it('should display a dataview with valued activities', () => {
    expect(page.getDataviewWithActivitiesEvaluate().isPresent()).toBe(true);
  });

  it('should sort the valued activities', () => {
    page.getDropdownToSort().click();
    page.getOptionDropdown('Calificación de alta a baja').click();
    expect(page.getLabelDropdown().getText()).toEqual('Calificación de alta a baja');
  });

  it('should search a activity that is not valued ', () => {
    page.getInputSearchActivity().sendKeys('error');
    expect(page.getEmptyMessage().getText()).toEqual('No se han encontrado entradas.');
  });

});
