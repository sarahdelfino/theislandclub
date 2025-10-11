import { CommonModule, ViewportScroller } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AlertComponent } from "../alert/alert.component";
import { Member } from '../member';
import { FirebaseService } from '../firebase.service';
import { eventSubmission } from '../eventSubmission';
import { FormControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CheckoutComponent } from "../checkout/checkout.component";
import emailjs from '@emailjs/browser';
import { RequestEventComponent } from "../request-event/request-event.component";

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CheckoutComponent, RequestEventComponent],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {
  }

  @ViewChild('membershipTitle', { static: true }) memberDiv: ElementRef;

  dynamicFormGroup!: FormGroup;

  alertText = '';
  alertType = '';
  err = false;
  success = false;
  familyChecked = false;
  memForm: FormGroup;
  errorText = '';
  signUpVisible = true;
  requestFormVisible = false;

  ngOnInit() {
    this.memForm = this.formBuilder.group({
      submitDate: new FormControl(Date.now(), [Validators.required]),
      membershipType: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      currentAddress: new FormControl('', [Validators.required]),
      zip: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      priorAddress: new FormControl(''),
      interest: new FormControl(''),
      hear: new FormControl(''),
      family: this.formBuilder.group({
        spouseFirstName: new FormControl('', [Validators.required]),
        spouseEmail: new FormControl('', [Validators.required, Validators.email]),
        spousePhone: new FormControl('', [Validators.required]),
        children: this.formBuilder.array([]),
      }),
      committee: new FormControl('')
    });

    this.memForm.get('membershipType')?.valueChanges.subscribe(val => {
      if (val === 'individual') {
        this.memForm.get('family.spouseFirstName')?.clearValidators();
        this.memForm.get('family.spouseEmail')?.clearValidators();
        this.memForm.get('family.spousePhone')?.clearValidators();
      } else {
        this.memForm.get('family.spouseFirstName')?.addValidators(Validators.required);
        this.memForm.get('family.spouseEmail')?.addValidators([Validators.required, Validators.email]);
        this.memForm.get('family.spousePhone')?.addValidators(Validators.required);
      }
      this.memForm.get('family.spouseFirstName')?.updateValueAndValidity();
      this.memForm.get('family.spouseEmail')?.updateValueAndValidity();
      this.memForm.get('family.spousePhone')?.updateValueAndValidity();
    })
  }

  children(): FormArray {
    return this.memForm.get("family.children") as FormArray
  }

  newChild(): FormGroup {
    return this.formBuilder.group({
      name: ''
    });
  }

  addChild(e: Event) {
    e.preventDefault();
    this.children().push(this.newChild());
  }

  toggleSignup() {
    this.requestFormVisible = false;
    this.signUpVisible = true;
    this.err = false;
    this.errorText = '';
  }

  toggleRequest() {
    this.signUpVisible = false;
    this.requestFormVisible = true;
    this.err = false;
    this.errorText = '';
  }

  receiveMessage($event: any) {
    console.log($event);
  }
}
