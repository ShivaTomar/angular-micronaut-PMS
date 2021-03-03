import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PetService } from 'src/app/_services/pet.service';

@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {
  petForm: FormGroup;
  alertMessage: String;

  get f() { return this.petForm.controls }
  
  getNameFc() { return this.petForm.get('name') }
  getBreedFc() { return this.petForm.get('breed') }
  getColorFc() { return this.petForm.get('color') }
  getSpeciesFc() { return this.petForm.get('species') }

  constructor(
    private petService: PetService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.petForm = this.formBuilder.group({
      name: ['Tim', Validators.required],
      species: ['Dog', Validators.required],
      breed: ['Husky', Validators.required],
      color: ['White', Validators.required]
    })
  }

  isInvalidInput(fieldName) {
    return this.petForm.get(fieldName).invalid && (this.petForm.get(fieldName).dirty || this.petForm.touched);
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

  onSubmit() {

    if (this.petForm.invalid) {
      this.petForm.markAllAsTouched();
      return;
    }

    this.petService.addPet(this.petForm.value).subscribe(
      success => {
        this.petForm.markAsUntouched();
        this.petForm.reset();
        this.alertMessage = "A new pet is added!";
      }
    );
  }
}