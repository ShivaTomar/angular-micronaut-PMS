import { FormControl } from "@angular/forms";

export function isUniqueEmail(control: FormControl) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      this.registerService.isUniqueEmail(control.value).subscribe(() => {
        resolve(null);
      }, () => { resolve({ 'notUniqueEmail': true });});
    }, 2000);
  });
}

export function isUniqueUsername(control: FormControl) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      this.registerService.isUniqueUsername(control.value).subscribe(() => {
        resolve(null);
      }, () => { resolve({ 'notUniqueUsername': true }); });
    }, 2000);
  });
}