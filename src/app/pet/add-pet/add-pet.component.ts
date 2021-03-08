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
      name: ['tim', Validators.required],
      species: ['dog', Validators.required],
      breed: ['german shepard', Validators.required],
      color: ['brown', Validators.required]
    })    
  }

  nameHasError() {
    return (this.NameFc.touched || this.NameFc.dirty) && !!this.nameErrorMessage();
  }

  breedHasError() {
    return (this.BreedFc.touched || this.BreedFc.dirty) && !!this.breedErrorMessage();
  }

  colorHasError() {
    return (this.ColorFc.touched || this.ColorFc.dirty) && !!this.colorErrorMessage();
  }

  speciesHasError() {
    return (this.SpeciesFc.touched || this.SpeciesFc.dirty) && !!this.speciesErrorMessage();
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
        this.petForm.reset();
        this.alertMessage = "A new pet is added!";
      }
    );
  }
}