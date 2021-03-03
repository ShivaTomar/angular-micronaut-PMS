import { Component, OnInit } from '@angular/core';
import { PetService } from 'src/app/_services/pet.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Pet } from 'src/app/_models/pet';
import {Location } from '@angular/common';

@Component({
  selector: 'app-edit-pet',
  templateUrl: './edit-pet.component.html',
  styleUrls: ['./edit-pet.component.css']
})
export class EditPetComponent implements OnInit {
  pet: Pet;
  editPetForm: FormGroup;
  alertMessage: String;

  get f() { return this.editPetForm.controls }
  
  getNameFc() { return this.editPetForm.get('name') }
  getBreedFc() { return this.editPetForm.get('breed') }
  getColorFc() { return this.editPetForm.get('color') }
  getSpeciesFc() { return this.editPetForm.get('species') }

  constructor(
    private petService: PetService, 
    private formBuilder: FormBuilder, 
    private router: ActivatedRoute, 
    private location: Location
  ) { }

  ngOnInit(): void {
    this.petDetails();

    this.editPetForm = this.formBuilder.group({
      name: [this.pet.name, Validators.required],
      species: [this.pet.species, Validators.required],
      breed: [this.pet.breed, Validators.required],
      color: [this.pet.color, Validators.required]
    })
  }

  isInvalidInput(fieldName) {
    return this.editPetForm.get(fieldName).invalid && (this.editPetForm.get(fieldName).dirty || this.editPetForm.touched);
  }

  nameHasError() {
    return !!this.nameErrorMessage;
  }

  breedHasError() {
    return !!this.breedErrorMessage;
  }

  colorHasError() {
    return !!this.colorErrorMessage;
  }

  speciesHasError() {
    return !!this.speciesErrorMessage;
  }

  nameErrorMessage() {
    return this.getNameFc().hasError('required') ? 'Name is required' : '';
  }

  breedErrorMessage() {
    return this.getBreedFc().hasError('required') ? 'Breed is required' : '';
  }

  speciesErrorMessage() {
    return this.getSpeciesFc().hasError('required') ? 'Species is required' : '';
  }

  colorErrorMessage() {
    return this.getColorFc().hasError('required') ? 'Color is required' : '';
  }

  petDetails() {
    const id = +this.router.snapshot.paramMap.get('id');
    this.petService.getPet(id).subscribe(result => this.pet = result);
  }

  onSubmit() {
    if (this.editPetForm.invalid) {
      this.editPetForm.markAllAsTouched;
      return;
    }

    this.petService.updatePet(this.pet).subscribe(success => {
      this.location.back();
    },
      error => {
        this.alertMessage = error;
      }
    );
  }
}