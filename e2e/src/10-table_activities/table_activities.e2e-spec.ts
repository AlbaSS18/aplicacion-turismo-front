import {TableActivitiesPage} from './table_activities.po';
import {AddActivityPage} from '../05-add_activity/add_activity.po';
import {browser, by, element, Key} from 'protractor';

describe('10 - Table activities component', () => {
  let page: TableActivitiesPage;

  beforeEach(() => {
    page = new TableActivitiesPage();
    page.navigateTo().click();
  });

  it('should display a table', () => {
    expect(page.tableActivities().isPresent()).toBe(true);
  });

  it('should remove a activity', () => {
    page.getDeleteActivityBtnWithTextSpecifyc().click();
    expect(page.getDeleteMessage('¿Estás seguro de qué quieres eliminar esta actividad? Se eliminarán todos los datos relacionados').isPresent()).toBe(true);
    page.getCloseBtnConfirmDialog().click();
  });

  it('should see more info about an activity', () => {
    const varAux = page.getNameFirstRow().getText();
    page.getButtonInfoOfFirstRowOfTable(0).click();
    expect(page.getPanelWithActivityInfo(page.getNameFirstRow().getText()).getText()).toBe(varAux);
    page.getCloseBtnDynamicDialog().click();
  });

  it('should search a activity that not exist', () => {
    page.getInputSearchActivity().sendKeys('activityError');
    expect(page.getTableRows().count()).toBe(0);
    page.getInputSearchActivity().clear();
    page.getInputSearchActivity().sendKeys(Key.chord('w', Key.BACK_SPACE));
  });


});
