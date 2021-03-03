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
  get NameFc() { return this.editPetForm.get('name') }
  get BreedFc() { return this.editPetForm.get('breed') }
  get ColorFc() { return this.editPetForm.get('color') }
  get SpeciesFc() { return this.editPetForm.get('species') }

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

  nameHasError() {
    return (this.NameFc.touched || this.NameFc.dirty) && !!this.nameErrorMessage();
  }

  breedHasError() {
    return (this.NameFc.touched || this.NameFc.dirty) && !!this.breedErrorMessage();
  }

  colorHasError() {
    return (this.NameFc.touched || this.NameFc.dirty) && !!this.colorErrorMessage();
  }

  speciesHasError() {
    return (this.NameFc.touched || this.NameFc.dirty) && !!this.speciesErrorMessage();
  }

  nameErrorMessage() {
    return this.NameFc.hasError('required') ? 'Name is required' : '';
  }

  breedErrorMessage() {
    return this.BreedFc.hasError('required') ? 'Breed is required' : '';
  }

  colorErrorMessage() {
    return this.ColorFc.hasError('required') ? 'Color is required' : '';
  }
  
  speciesErrorMessage() {
    return this.SpeciesFc.hasError('required') ? 'Species is required' : '';
  }

  petDetails() {
    const id = +this.router.snapshot.paramMap.get('id');
    this.petService.getPet(id).subscribe(result => this.pet = result);
  }

  onSubmit() {
    if (!this.editPetForm.valid) {
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