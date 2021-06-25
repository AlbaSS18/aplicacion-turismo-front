var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"login","pathMatch":"full"},{"path":"login","component":"LoginComponent","resolve":["IsLogginInGuardService"]},{"path":"signup","component":"SignUpComponent","resolve":["IsLogginInGuardService"]},{"path":"activities","component":"TableActivitiesComponent","canActivate":["RoleGuardService"],"data":{"expectedRol":"admin"}},{"path":"activities/edit/:id","component":"EditActivitiesComponent","canActivate":["RoleGuardService"],"data":{"expectedRol":"admin"}},{"path":"activities/add","component":"AddActivityComponent","canActivate":["RoleGuardService"],"data":{"expectedRol":"admin"}},{"path":"cities","component":"ListCitiesComponent","canActivate":["RoleGuardService"],"data":{"expectedRol":"admin"}},{"path":"interest","component":"ListInterestComponent","canActivate":["RoleGuardService"],"data":{"expectedRol":"admin"}},{"path":"user","component":"ListUserComponent","canActivate":["RoleGuardService"],"data":{"expectedRol":"admin"}},{"path":"admin/user/edit/:id","component":"EditUserAdminComponent","canActivate":["RoleGuardService"],"data":{"expectedRol":"admin"}},{"path":"profile/edit","component":"EditUserComponent","canActivate":["AuthGuardService"]},{"path":"recommendationMap","component":"RecommendationMapComponent","canActivate":["RoleGuardService"],"data":{"expectedRol":["user","admin"]}},{"path":"activitiesEvaluate","component":"ListActivitiesEvaluateComponent","canActivate":["RoleGuardService"],"data":{"expectedRol":["user","admin"]}},{"path":"**","redirectTo":"login","pathMatch":"full"}],"kind":"module"}]}
