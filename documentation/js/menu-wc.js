'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">proyecto-turismo-front documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-c5d200cfa91623bb1ac0942c9d0b0eb3"' : 'data-target="#xs-components-links-module-AppModule-c5d200cfa91623bb1ac0942c9d0b0eb3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-c5d200cfa91623bb1ac0942c9d0b0eb3"' :
                                            'id="xs-components-links-module-AppModule-c5d200cfa91623bb1ac0942c9d0b0eb3"' }>
                                            <li class="link">
                                                <a href="components/AddActivityComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AddActivityComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditActivitiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditActivitiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUserAdminComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditUserAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EditUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EditUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/InformationActivitiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">InformationActivitiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListActivitiesEvaluateComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListActivitiesEvaluateComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListCitiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListCitiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListInterestComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListInterestComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListUserComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MenuBarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MenuBarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecommendationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecommendationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RecommendationMapComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RecommendationMapComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignUpComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignUpComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TableActivitiesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TableActivitiesComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-c5d200cfa91623bb1ac0942c9d0b0eb3"' : 'data-target="#xs-injectables-links-module-AppModule-c5d200cfa91623bb1ac0942c9d0b0eb3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-c5d200cfa91623bb1ac0942c9d0b0eb3"' :
                                        'id="xs-injectables-links-module-AppModule-c5d200cfa91623bb1ac0942c9d0b0eb3"' }>
                                        <li class="link">
                                            <a href="injectables/NotificationService.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>NotificationService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link">AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Activity.html" data-type="entity-link">Activity</a>
                            </li>
                            <li class="link">
                                <a href="classes/ActivityRecommended.html" data-type="entity-link">ActivityRecommended</a>
                            </li>
                            <li class="link">
                                <a href="classes/City.html" data-type="entity-link">City</a>
                            </li>
                            <li class="link">
                                <a href="classes/Interest.html" data-type="entity-link">Interest</a>
                            </li>
                            <li class="link">
                                <a href="classes/Interest-1.html" data-type="entity-link">Interest</a>
                            </li>
                            <li class="link">
                                <a href="classes/InterestByUser.html" data-type="entity-link">InterestByUser</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtModel.html" data-type="entity-link">JwtModel</a>
                            </li>
                            <li class="link">
                                <a href="classes/Rol.html" data-type="entity-link">Rol</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserLogin.html" data-type="entity-link">UserLogin</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserSignUp.html" data-type="entity-link">UserSignUp</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ActivityService.html" data-type="entity-link">ActivityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link">AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CityService.html" data-type="entity-link">CityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ImagesService.html" data-type="entity-link">ImagesService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/InterestService.html" data-type="entity-link">InterestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStorageService.html" data-type="entity-link">LocalStorageService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockActivityService.html" data-type="entity-link">MockActivityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockAuthService.html" data-type="entity-link">MockAuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockCityService.html" data-type="entity-link">MockCityService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockInterestService.html" data-type="entity-link">MockInterestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockRolService.html" data-type="entity-link">MockRolService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/MockUserService.html" data-type="entity-link">MockUserService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link">NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RolService.html" data-type="entity-link">RolService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link">UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interceptors-links"' :
                            'data-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/InterceptorService.html" data-type="entity-link">InterceptorService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuardService.html" data-type="entity-link">AuthGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/IsLogginInGuardService.html" data-type="entity-link">IsLogginInGuardService</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuardService.html" data-type="entity-link">RoleGuardService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});