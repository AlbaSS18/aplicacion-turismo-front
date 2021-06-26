import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { City } from "src/app/models/city";
import { LocalityService } from "./locality.service";

@Injectable()
export class MockCityService extends LocalityService {

    listCities = [
        {
            id: 1,
            name: "Gijón"
        },
        {
            id: 2,
            name: "Oviedo"
        },
    ];

    getLocalities(): Observable<City[]> {
        return of(this.listCities);
    }

    addLocality(city): Observable<any> {
        var cityToAdd = {
            id: this.listCities[this.listCities.length - 1].id + 1,
            name: city.name
        }
        this.listCities.push(cityToAdd);
        return of({
            mensaje: 'La ciudad ha sido añadida'
        });
    }

    deleteLocality(city): Observable<any> {
        this.listCities = this.listCities.filter(p => p.id !== city.id);
        return of({
            mensaje: 'La ciudad ha sido eliminada'
        });
    }

    editLocality(id, city): Observable<any> {
        const updateItem = this.listCities.find(ci => ci.id === id);
        const index = this.listCities.indexOf(updateItem);

        var cityToEdit = {
            id: id,
            name: city.name
        }
        this.listCities[index] = cityToEdit;

        return of({
            mensaje: 'La ciudad ha sido editada'
        });
    }
}
