import {RecommendationMapPage} from './recommendation_map.po';

describe('workspace-project App', () => {
  let page: RecommendationMapPage;

  beforeEach(() => {
    page = new RecommendationMapPage();
    page.navigateTo().click();
  });

  it('should display a map', () => {
    expect(page.getMap().isPresent()).toEqual(true);
  });

  it('should display a dataview with recommended activities', () => {
    expect(page.getDataviewContent().isPresent()).toEqual(true);
  });

  it('should be able to rate an activity', () => {
    page.getRateActivityBtn(1).click();
    page.getStar(2).click();
    expect(page.getSendRateBtn().isEnabled()).toBe(true);
    page.getCloseBtn().click();
  });

  it('should search an activity that it is not recommended', () => {
    page.getInputSearch().sendKeys('errorActividad');
    expect(page.getEmptyMessage().getText()).toEqual('No se han encontrado entradas.');
  });

});
