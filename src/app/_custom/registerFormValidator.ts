import { FormControl } from "@angular/forms";

export function isUniqueUsername(control: FormControl) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      this.registerService.isUniqueUsername(control.value).subscribe(() => {
        resolve(null);
      }, () => { resolve({ 'notUniqueUsername': true }); });
    }, 2000);
  });
}