import {by, element} from 'protractor';

export class RecommendationMapPage{

  navigateTo() {
    return element(by.id('recommendation_map_nav'));
  }

  getMap(){
    return element(by.id('mapActivityRecommendation'));
  }

  getDataviewContent(){
    return element(by.css('.p-dataview-content'));
  }

  getRateActivityBtn(activity){
    //return element(by.xpath('//div[contains(@class, "p-dataview-content")]/div/div[1]/div[contains(@class, "activity-recommendation-list-detail/button")]'));
    return element(by.xpath('//div[contains(@class, "p-dataview-content")]/div/div[1]/div/div[contains(@class, "activity-recommendation-list-detail")]/button'));
  }

  getStar(numberStar: number){
    return element.all(by.css('.p-rating-icon')).get(numberStar);
  }

  getSendRateBtn(){
    return element(by.id('rate_btn'));
  }

  getCloseBtn(){
    return element(by.css('.p-dialog-header-close'));
  }

  getInputSearch(){
    return element(by.css('.filter_container input'));
  }

  getEmptyMessage(){
    return element(by.css('.p-dataview-emptymessage'));
  }
}
