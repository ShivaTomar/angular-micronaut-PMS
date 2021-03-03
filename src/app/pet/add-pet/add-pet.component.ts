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
  get NameFc() { return this.petForm.get('name') }
  get BreedFc() { return this.petForm.get('breed') }
  get ColorFc() { return this.petForm.get('color') }
  get SpeciesFc() { return this.petForm.get('species') }

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

  onSubmit() {

    if (!this.petForm.valid) {
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