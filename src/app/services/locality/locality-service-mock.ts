import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Locality } from "src/app/models/locality";
import { LocalityService } from "./locality.service";

@Injectable()
export class MockLocalityService extends LocalityService {

    listLocalities = [
        {
            id: 1,
            name: "Gijón"
        },
        {
            id: 2,
            name: "Oviedo"
        },
    ];

    getLocalities(): Observable<Locality[]> {
        return of(this.listLocalities);
    }

    addLocality(localities): Observable<any> {
        var localityToAdd = {
            id: this.listLocalities[this.listLocalities.length - 1].id + 1,
            name: localities.name
        }
        this.listLocalities.push(localityToAdd);
        return of({
            mensaje: 'La localidad ha sido añadida'
        });
    }

    deleteLocality(locality): Observable<any> {
        this.listLocalities = this.listLocalities.filter(p => p.id !== locality.id);
        return of({
            mensaje: 'La localidad ha sido eliminada'
        });
    }

    editLocality(id, locality): Observable<any> {
        const updateItem = this.listLocalities.find(ci => ci.id === id);
        const index = this.listLocalities.indexOf(updateItem);

        var localityToEdit = {
            id: id,
            name: locality.name
        }
        this.listLocalities[index] = localityToEdit;

        return of({
            mensaje: 'La localidad ha sido editada'
        });
    }
}
