import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { City } from "src/app/models/city";
import { CityService } from "./city.service";

@Injectable()
export class MockCityService extends CityService {

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

    getCities(): Observable<City[]> {
        return of(this.listCities);
    }

    addCity(city): Observable<any> {
        var cityToAdd = {
            id: this.listCities[this.listCities.length - 1].id + 1,
            name: city.name
        }
        this.listCities.push(cityToAdd);
        return of({
            mensaje: 'La ciudad ha sido añadida'
        });
    }

    deleteCity(city): Observable<any> {
        this.listCities = this.listCities.filter(p => p.id !== city.id);
        return of({
            mensaje: 'La ciudad ha sido eliminada'
        });
    }

    editCity(id, city): Observable<any> {
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