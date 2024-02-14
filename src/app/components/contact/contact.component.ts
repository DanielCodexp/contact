import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public contactForm!: FormGroup;
  public messageSent: string | null = null;
  public errorMessage: string | null = null;
  public showSuccessAlert: boolean = false;
  public submittingForm: boolean = false;



  constructor(
    private fb: FormBuilder,
    private ContactService: ContactService
    ) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group( {
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]],
      subject: ["", Validators.required],
      message: ["", Validators.required]
     });

     this.setCustomErrorMessages();

  }

  setCustomErrorMessages() {
    const emailControl = this.contactForm.get('email');
    const phoneControl = this.contactForm.get('phone');

    if (emailControl) {
      emailControl.setErrors({ 'invalidEmail': true });
    }
    if (phoneControl) {
      phoneControl.setErrors({ 'invalidPhone': true });
    }
  }
  submitForm() {
    this.submittingForm = true;
    if (this.contactForm.valid) {

      this.ContactService.addContact(this.contactForm.value).pipe(
        finalize(() => {
          this.submittingForm = false;

        })
    ).subscribe((res) => {

      this.messageSent = "Mensaje enviado con éxito";
      this.errorMessage = null;

      this.showSuccessAlert = true;
      this.contactForm.reset();
    }, (error) => {

    });
;
      setTimeout(() => {
        this.showSuccessAlert = false;
      }, 10000);

    } else {
      this.submittingForm = false;
      this.errorMessage = "Por favor complete correctamente el formulario";
      this.messageSent = null;

      this.markFormGroupTouched(this.contactForm);
    }
  }


  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}



