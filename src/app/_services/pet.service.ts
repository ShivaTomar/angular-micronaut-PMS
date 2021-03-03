import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../configs';
import { Pet } from '../_models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  constructor(private http: HttpClient) { }

  getPets() {
    return this.http.get<Pet[]>(`${config.apiUrl}/pets`);
  }

  addPet(pet: Pet) {
    return this.http.post(`${config.apiUrl}/pets`, pet);
  }

  getPet(id: number) {
    return this.http.get<Pet>(`${config.apiUrl}/pets/${id}`);
  }

  updatePet(pet: Pet) {
    return this.http.put(`${config.apiUrl}/pets/${pet.id}`, pet);
  }

  deletePet(id: number) {
    return this.http.delete(`${config.apiUrl}/pets/${id}`);
  }
}