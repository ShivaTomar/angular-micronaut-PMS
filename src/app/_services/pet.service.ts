import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../configs';
import { Pet } from '../_models/pet';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  constructor(private http: HttpClient) { }

  updatePet(pet: Pet) {
    return this.http.put(`${config.apiUrl}/pets/${pet._id}`, pet);
  }

  getPets() {
    return this.http.get<any>(`${config.apiUrl}/pets`);
  }

  addPet(pet: Pet) {
    return this.http.post(`${config.apiUrl}/pets`, pet);
  }

  deletePet(id: number) {
    return this.http.delete(`${config.apiUrl}/pets/${id}`);
  }

  getPet(id: number) {
    return this.http.get<Pet>(`${config.apiUrl}/pets/${id}`);
  }
}