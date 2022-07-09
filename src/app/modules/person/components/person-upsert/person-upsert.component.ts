import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { LoadingSpinnerService } from 'src/app/modules/shared/_services/loading-spinner.service';
import { countries } from 'src/app/modules/shared/_stores/country-store';
import { DateRangeValidator } from 'src/app/modules/shared/_validators/date-range-validator';
import { MaxFileSizeValidator } from 'src/app/modules/shared/_validators/max-file-size-validator';
import { PersonDetails } from 'src/app/_models/person/person-details';
import { Country } from 'src/app/_models/shared/country';
import { PersonService } from 'src/app/_services/person.service';

@Component({
  selector: 'app-person-upsert',
  templateUrl: './person-upsert.component.html',
  styleUrls: ['./person-upsert.component.sass']
})
export class PersonUpsertComponent implements OnInit {
  @Input()selectedPerson: PersonDetails | undefined;

  @Output() close = new EventEmitter();
  @Output() personAdded = new EventEmitter<PersonDetails>();
  @Output() personUpdated = new EventEmitter<PersonDetails>();

  personForm!: FormGroup;
  countries: Country[] = countries;

  constructor(private personService: PersonService, private loader: LoadingSpinnerService ) {
  }

  ngOnInit(): void {
    this.personForm = new FormGroup({
      name: new FormControl(this.selectedPerson?.name, [Validators.required, Validators.maxLength(100)]),
      email: new FormControl(this.selectedPerson?.email, [Validators.required, Validators.pattern(/^[\w\-\.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,4}$/)]),
      dob: new FormControl(this.selectedPerson?.dob != null ? formatDate(this.selectedPerson?.dob, 'yyyy-MM-dd', 'en') : null, [Validators.required, DateRangeValidator(new Date("1900-01-01T00:00:00.000Z"), new Date())]),
      country: new FormControl(this.selectedPerson?.country, [Validators.required]),
      avatar: new FormControl(null, [MaxFileSizeValidator(80)])
    });
  }

  handleAvatarChange(event: any) {
    const file = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    if (file) {
      const pattern = /image-*/;
      if (!file.type.match(pattern) || file.type === 'image/x-icon') {
        alert('Invalid file format');
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (result: any) => {
        let reader = result.target;
        this.personForm.controls['avatar'].setValue(reader.result);
      }
    }
  }

  cancel() {
    this.close.emit();
  }

  submit() {
    if (this.personForm.valid){
      this.loader.start();
      const personToSubmit: PersonDetails = {
        id: this.selectedPerson?.id,
        name: this.personForm.controls['name'].value,
        email: this.personForm.controls['email'].value,
        dob: this.personForm.controls['dob'].value,
        country: this.personForm.controls['country'].value,
        avatar: this.personForm.controls['avatar'].value??this.selectedPerson?.avatar,
      };
      if (!this.selectedPerson) {
        this.personService.post(personToSubmit).pipe(finalize(() => this.loader.stop())).subscribe(result => {
          this.personAdded.emit(result);
        }, error => {
          console.log(error);
        })
      }
      else {
        this.personService.patch(personToSubmit).pipe(finalize(() => this.loader.stop())).subscribe(result => {
          this.personUpdated.emit(result);
        }, error => {
          console.log(error);
        })
      }
    }
  }
}
