import {ListInterestPage} from './list_interest.po';
import {Key} from 'selenium-webdriver';

describe('07 - List interest component', () => {
  let page: ListInterestPage;

  beforeEach(() => {
    page = new ListInterestPage();
    page.navigateTo().click();
  });

  it('should display a virtual scroller with cities', () => {
    expect(page.listInterest().isPresent()).toBe(true);
  });

  it('should display a error message when input is empty', () => {
    page.getAddInterestBtn().click();
    page.getNameInput('field-name-interest').sendKeys(' ');
    expect(page.getErrorMessage('El nombre es obligatorio').isPresent()).toBe(true);
    page.getCancelInterestBtn('add_cancel_interest_btn').click();
  });

  it('should enable the send button', () => {
    page.getAddInterestBtn().click();
    page.getNameInput('field-name-interest').sendKeys('NewInterest');
    expect(page.getSaveInterestBtn('add_save_interest_btn').isEnabled()).toBe(true);
    page.getCancelInterestBtn('add_cancel_interest_btn').click();
  });

  it('should display a error message when city is repeated', () => {
    page.getAddInterestBtn().click();
    page.getNameInput('field-name-interest').sendKeys('Museos');
    page.getSaveInterestBtn('add_save_interest_btn').click();
    expect(page.getErrorMessage('Ya hay un interés con ese nombre').isPresent()).toBe(true);
    page.getCancelInterestBtn('add_cancel_interest_btn').click();
  });

  it('should display a dialog when delete button is clicked', () => {
    page.getDeleteBtn().click();
    expect(page.getDeleteMessage('¿Estás seguro de qué quieres eliminar este interés? Se eliminarán todos los datos relacionados').isPresent()).toBe(true);
    page.getCloseBtnConfirmDialog().click();
  });

  it('should be able to edit the name of the city', () => {
    page.getEditButton().click();
    page.getNameInput('field-edit-name-interest').sendKeys('Mus');
    page.getCancelInterestBtn('edit_cancel_interest_btn').click();
  });

  it('should display message error when input edit city is empty', () => {
    page.getEditButton().click();
    page.getNameInput('field-edit-name-interest').sendKeys(Key.chord(Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE ));
    expect(page.getErrorMessage('El nombre es obligatorio').isPresent()).toBe(true);
    expect(page.getSaveInterestBtn('edit_save_interest_btn').isEnabled()).toBe(false);
    page.getCancelInterestBtn('edit_cancel_interest_btn').click();
  });

})
