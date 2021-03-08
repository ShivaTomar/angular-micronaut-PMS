import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/_services/pet.service';
import { Location } from '@angular/common';
import { Pet } from 'src/app/_models/pet';

@Component({
  selector: 'app-show-pet',
  templateUrl: './show-pet.component.html',
  styleUrls: ['./show-pet.component.css']
})
export class ShowPetComponent implements OnInit {
  pets: Pet[] = [];
  pet: Pet;
  alertMessage: String;

  constructor(private petService: PetService, private location: Location) { }

  ngOnInit(): void {
    this.getPets();
  }

  getPets() {
    this.petService.getPets().subscribe((result: any) => { this.pets = result; });
  }

  petDetails(id: number) {
    this.petService.getPet(id).subscribe(result => this.pet = result);
  }

  deletePet(id: number) {
    this.pets = this.pets.filter(pet => pet._id != id);
    if (this.pet && this.pet._id === id) this.hideDetails();

    this.petService.deletePet(id).subscribe(result => {
      this.alertMessage = "Deleted successfully!"
    });
  }

  hideDetails() {
    this.pet = undefined;
  }

  goBack() {
    this.location.back();
  }
}