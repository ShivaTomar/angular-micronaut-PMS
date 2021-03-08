import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Owner } from "../_models/owner";
import { Pet } from '../_models/pet';
import { Address } from '../_models/address';
import { config } from '../configs';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const owners: Owner[] = JSON.parse(localStorage.getItem('owners')) || [];
    const pets: Pet[] = JSON.parse(localStorage.getItem('pets')) || [];
    const principle: Owner = JSON.parse(localStorage.getItem('currentUser'));

    const { url, method, headers, body } = request;

    console.log(request);

    return of(null).pipe((handleRoute))

    function handleRoute() {
      switch (true) {
        case url.endsWith('/login') && method === 'POST':
          return authenticate();
        case url.endsWith('/register') && method === 'POST':
          return register();
        case url.endsWith('/owner') && method === 'GET':
          return getOwner();
        case url.endsWith("/owner") && method === 'PATCH':
          return updateOwner();
        case url.endsWith("/pets") && method === 'GET':
          return getPets();
        case url.endsWith("/pets") && method === 'POST':
          return addPet();
        case url.match(/pets\/\d+$/) && method === 'GET':
          return getPet();
        case url.match(/pets\/\d+$/) && method === 'DELETE':
          return deletePet();
        case url.match(/pets\/\d+$/) && method === 'PUT':
          return updatePet();
        case url.match("/verify-email") && method === 'POST':
          return verifyEmail();
        case url.match("/verify-username") && method === 'POST':
          return verifyUsername();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions
    function authenticate() {
      const { username, password } = body;

      const filteredOwners = owners.filter(owner => {
        return owner.username === username && owner.password === password;
      });

      if (filteredOwners.length) {
        const owner = filteredOwners[0];

        return ok({
          id: owner._id,
          username: owner.username,
          fullName: owner.fullName,
          token: 'fake-jwt-token'
        });
      }
      return error('Username or Password is incorrect');
    }

    function register() {
      const newUser = body;

      const duplicateUser = owners.filter(owner => {
        return owner.username === newUser.username || owner.email === newUser.email
      }).length;

      if (duplicateUser) {
        return error("User already exists");
      }

      newUser.id = owners.length + 1;
      owners.push(newUser);
      localStorage.setItem('owners', JSON.stringify(owners));

      return created();
    }

    function getOwner() {
      if (!isLoggedIn) return Unauthorized();

      let ownerDetails: Owner[] = owners.filter(owner => { return owner.username === principle.username; });
      return ownerDetails.length ? ok(ownerDetails[0]) : notFound();
    }

    function updateOwner() {
      if (!isLoggedIn) return Unauthorized();

      let IsUpdated = false, updatedOwner: Owner;
      const { fullName, password } = body;


      owners.forEach(owner => {
        if (owner.username === principle.username) {
          owner.fullName = fullName;
          owner.password = password;
          IsUpdated = true;
          updatedOwner = owner;
          return;
        }
      })

      if (IsUpdated) {
        localStorage.setItem('owners', JSON.stringify(owners));
        return ok(updatedOwner);
      }

      return notFound();
    }

    function getPets() {
      if (!isLoggedIn) return Unauthorized();

      const ownerPets: Pet[] = pets.filter(pet => pet.owner === principle.username);
      return ok(ownerPets);
    }

    function addPet() {
      if (!isLoggedIn) return Unauthorized();

      const newPet: Pet = body;

      newPet._id = pets.length + 1;
      newPet.owner = principle.username;
      pets.push(newPet);
      localStorage.setItem('pets', JSON.stringify(pets));

      return created();
    }

    function getPet() {
      if (!isLoggedIn) return Unauthorized();

      const id = idFromUrl();
      const pet = pets.filter(pet => { return pet._id === id && pet.owner === principle.username });

      return pet ? ok(pet[0]) : notFound();
    }

    function deletePet() {
      if (!isLoggedIn) return Unauthorized();

      const id = idFromUrl();
      let IsDeleted = false;

      for (let i = 0; i < pets.length; i++) {
        let pet = pets[i];
        if (pet._id === id && pet.owner === principle.username) {
          pets.splice(i, 1);
          IsDeleted = true;
          localStorage.setItem('pets', JSON.stringify(pets));
          break;
        }
      }

      return IsDeleted ? ok() : notFound();
    }

    function updatePet() {
      if (!isLoggedIn) return Unauthorized();

      const id = idFromUrl(), updatedPet = body
      let IsUpdated = false;

      pets.forEach(pet => {
        if (pet._id === id && pet.owner === principle.username) {
          pet.name = updatedPet.name
          pet.color = updatedPet.color
          pet.species = updatedPet.species
          pet.breed = updatedPet.breed
          IsUpdated = true;
          localStorage.setItem('pets', JSON.stringify(pets));
        }
      })

      return IsUpdated ? ok() : notFound();
    }

    function verifyEmail() {
      const { email } = body;

      const duplicateEmail = owners.filter(owner => { return owner.email === email; }).length;
      if (duplicateEmail) {
        return error(`An account with this email already exists.`);
      }

      return ok();
    }

    function verifyUsername() {
      const { username } = body;

      const duplicateUsername = owners.filter(owner => { return owner.username === username; }).length;
      if (duplicateUsername) {
        return error(`An account with this username already exists.`);
      }

      return ok();
    }

    // function createDemoUser(): Owner[] {

    //   const owners: Owner[] = [
    //     new Owner(1, "Demo Owner", config.demoOwner, "DemoOwner790@gmail.com", config.demoPassword,
    //       new Address("163, avantika, ansal", "near shastri nagar", "Ghaziabad", "UP", "201002"))
    //   ];

    //   localStorage.setItem('owners', JSON.stringify(owners));
    //   return owners;
    // }

    //helper functions

    function Unauthorized() {
      return throwError({ status: 401, error: { message: 'Unauthorized' } })
    }

    function notFound() {
      return throwError({ status: 404, error: { message: "Not Found" } })
    }

    function ok(body?) {
      return of(new HttpResponse({ status: 200, body }))
    }

    function created(body?) {
      return of(new HttpResponse({ status: 201, body }))
    }

    function isLoggedIn() {
      return headers.get('Authorization') === 'Bearer fake-jwt-token';
    }

    function error(message) {
      return throwError({ error: { message } });
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};