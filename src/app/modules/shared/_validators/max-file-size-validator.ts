import { AbstractControl, ValidatorFn } from '@angular/forms';

export function MaxFileSizeValidator(maxSizeInKBs: number): ValidatorFn  {
  return (control: AbstractControl) => {
    const file = control.value;
    if (file) {
      const stringLength = file.length - 'data:image/png;base64,'.length;
      const sizeInBytes = 4 * Math.ceil((stringLength / 3))*0.5624896334383812;
      if (sizeInBytes / 1024 > maxSizeInKBs) {
        return {
          maxFileSize: true
        };
      }
      return null;
    }
    return null;
  };
}
