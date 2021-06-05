import {ListCitiesPage} from './list_cities.po';
import {Key} from 'selenium-webdriver';
import {browser} from 'protractor';

describe('06 - List cities component', () => {
  let page: ListCitiesPage;

  beforeEach(() => {
    page = new ListCitiesPage();
    page.navigateTo().click();
  });


  it('should display a virtual scroller with cities', () => {
    expect(page.listCities().isPresent()).toBe(true);
  });

  it('should display a error message when input is empty', () => {
    page.getAddCityBtn().click();
    page.getNameInput('field-name-city').sendKeys(' ');
    expect(page.getErrorMessage('El nombre es obligatorio').isPresent()).toBe(true);
    page.getCancelCityBtn('add_cancel_city_btn').click();
  });

  it('should enable the send button', () => {
    page.getAddCityBtn().click();
    page.getNameInput('field-name-city').sendKeys('NewCity');
    expect(page.getSaveCityBtn('add_save_city_btn').isEnabled()).toBe(true);
    page.getCancelCityBtn('add_cancel_city_btn').click();
  });

  it('should display a error message when city is repeated', () => {
    page.getAddCityBtn().click();
    page.getNameInput('field-name-city').sendKeys('Oviedo');
    page.getSaveCityBtn('add_save_city_btn').click();
    expect(page.getErrorMessage('Ya hay una ciudad con ese nombre').isPresent()).toBe(true);
    page.getCancelCityBtn('add_cancel_city_btn').click();
  });

  it('should display a dialog when delete button is clicked', () => {
    page.getDeleteBtn().click();
    expect(page.getDeleteMessage('¿Estás seguro de qué quieres eliminar esta ciudad? Se eliminarán todos los datos relacionados').isPresent()).toBe(true);
    page.getCloseBtnConfirmDialog().click();
  });

  it('should be able to edit the name of the city', () => {
    page.getEditButton().click();
    page.getNameInput('field-edit-name-city').sendKeys('Gij');
    page.getCancelCityBtn('edit_cancel_city_btn').click();
  });

  it('should display message error when input edit city is empty', () => {
    page.getEditButton().click();
    page.getNameInput('field-edit-name-city').sendKeys(Key.chord(Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE ));
    expect(page.getErrorMessage('El nombre es obligatorio').isPresent()).toBe(true);
    expect(page.getSaveCityBtn('edit_save_city_btn').isEnabled()).toBe(false);
    page.getCancelCityBtn('edit_cancel_city_btn').click();
  });


});
