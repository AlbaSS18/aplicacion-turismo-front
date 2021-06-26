import {ListLocalitiesPage} from './list_localities.po';
import {Key} from 'selenium-webdriver';

describe('06 - List localities component', () => {
  let page: ListLocalitiesPage;

  beforeEach(() => {
    page = new ListLocalitiesPage();
    page.navigateTo().click();
  });


  it('should display a virtual scroller with localities', () => {
    expect(page.listLocality().isPresent()).toBe(true);
  });

  it('should display a error message when input is empty', () => {
    page.getAddLocalityBtn().click();
    page.getNameInput('field-name-locality').sendKeys(' ');
    expect(page.getErrorMessage('El nombre es obligatorio').isPresent()).toBe(true);
    page.getCancelLocalityBtn('add_cancel_locality_btn').click();
  });

  it('should enable the send button', () => {
    page.getAddLocalityBtn().click();
    page.getNameInput('field-name-locality').sendKeys('NewLocality');
    expect(page.getSaveLocalityBtn('add_save_locality_btn').isEnabled()).toBe(true);
    page.getCancelLocalityBtn('add_cancel_locality_btn').click();
  });

  it('should display a error message when locality is repeated', () => {
    page.getAddLocalityBtn().click();
    page.getNameInput('field-name-locality').sendKeys('Oviedo');
    page.getSaveLocalityBtn('add_save_locality_btn').click();
    expect(page.getErrorMessage('Ya hay una ciudad con ese nombre').isPresent()).toBe(true);
    page.getCancelLocalityBtn('add_cancel_locality_btn').click();
  });

  it('should display a dialog when delete button is clicked', () => {
    page.getDeleteBtn().click();
    expect(page.getDeleteMessage('¿Estás seguro de qué quieres eliminar esta ciudad? Se eliminarán todos los datos relacionados').isPresent()).toBe(true);
    page.getCloseBtnConfirmDialog().click();
  });

  it('should be able to edit the name of the locality', () => {
    page.getEditButton().click();
    page.getNameInput('field-edit-name-locality').sendKeys('Gij');
    page.getCancelLocalityBtn('edit_cancel_locality_btn').click();
  });

  it('should display message error when input edit locality is empty', () => {
    page.getEditButton().click();
    page.getNameInput('field-edit-name-locality').sendKeys(Key.chord(Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE ));
    expect(page.getErrorMessage('El nombre es obligatorio').isPresent()).toBe(true);
    expect(page.getSaveLocalityBtn('edit_save_locality_btn').isEnabled()).toBe(false);
    page.getCancelLocalityBtn('edit_cancel_locality_btn').click();
  });


});
