import { CommonModule, ViewportScroller } from '@angular/common';
import { NgModel } from '@angular/forms';
import { Component, ElementRef, Input, OnInit, ViewChild, afterNextRender } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { AlertComponent } from "../alert/alert.component";
import { Member } from '../member';
import { FirebaseService } from '../firebase.service';
import { eventSubmission } from '../eventSubmission';
import { FormControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, AlertComponent, ReactiveFormsModule],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent implements OnInit {

  constructor(private firebaseService: FirebaseService, private formBuilder: FormBuilder, private http: HttpClient, private viewportScroller: ViewportScroller) {
  }

  // @Input() signUpVisible = false;
  @ViewChild('membershipTitle', { static: true }) memberDiv: ElementRef;

  dynamicFormGroup!: FormGroup;

  alertText = '';
  alertType = '';
  err = false;
  success = false;
  familyChecked = false;
  memForm: FormGroup;
  eventForm: FormGroup;
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

    this.eventForm = new FormGroup({
      submitDate: new FormControl(Date.now()),
      url: new FormControl(''),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      eventDate: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      eventName: new FormControl('', [Validators.required]),
      eventDescription: new FormControl('', [Validators.required]),
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

  submitMembership(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (this.memForm.invalid) {
      this.errorText = 'Please ensure all necessary values are provided.';
      this.alertType = 'err';
    } else {
      this.errorText = '';
      const membership = this.memForm.value;
      this.firebaseService.addMember(membership).then(() => {
        if (membership.membershipType === 'family') {
          emailjs.sendForm("service_lwdjtb9", "template_de4aoh4", form, {
            publicKey: 'pp0s7qlmsjt-_40XH',
          }).catch((err) => {
            console.log("Unable to send membership email: ", err);
            this.alertText = 'We were not able to process your submission at this time. Please try again.';
            this.err = true;
            this.alertType = 'err';
          });
        } else {
          // send individual email
          emailjs.sendForm("service_lwdjtb9", "template_hp8pthp", form, {
            publicKey: 'pp0s7qlmsjt-_40XH',
          }).catch((err) => {
            console.log("Unable to send membership email: ", err);
            this.alertText = 'We were not able to process your submission at this time. Please try again.';
            this.err = true;
            this.alertType = 'err';
          });
        }
        emailjs.sendForm("service_lwdjtb9", "template_fu1h6yo", form, {
          publicKey: 'pp0s7qlmsjt-_40XH'
        });
        this.success = true;
        this.alertText = 'Your submission has been received!';
        this.alertType = 'success';
        form.reset();
        setTimeout(() => {
          this.success = false;
        }, 5000);
      }).catch((err) => {
        this.alertText = 'We were not able to process your submission at this time. Please try again.';
        this.err = true;
        this.alertType = 'err';
        console.log('FAILED...', err);
      });
    }
  }

  submitEvent(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (this.eventForm.invalid) {
      this.errorText = 'Please ensure all necessary values are provided.';
    } else {
      this.errorText = '';
      const event = this.eventForm.value;
      const submittedEvent = new eventSubmission(Date.now().toString(), form['event_name'].value, form['event_date'].value, form['event_start'].value, form['event_end'].value, form['event_description'].value, form['first_name'].value + ' ' + form['last_name'].value, form['email'].value, 'pending approval', form['phone'].value);
          this.firebaseService.addEvent(submittedEvent).then((resp: any) => {
          let host = window.location.host;
          let ht;
          if (host === 'localhost:4200') {
            host = 'http://' + host;
          } else {
            host = 'https://' + host;
          }
          const id = resp.key;
          form['url'].value = host + '/events/' + id + '/approve';
        });
        emailjs
          .sendForm('service_lwdjtb9', 'template_jfj2cqe', form, {
            publicKey: 'pp0s7qlmsjt-_40XH',
          })
          .then(
            () => {
              this.success = true;
              this.alertText = 'Your submission has been received!';
              this.alertType = 'success';
              //send email to admins
              emailjs.sendForm('service_lwdjtb9', 'template_6r1j5k9', form, {
                publicKey: 'pp0s7qlmsjt-_40XH',
              }).then(
                (response) => {
                  console.log('SUCCESS!', response.status, response.text);
                },
                (error) => {
                  console.log('FAILED...', error);
                },
              );
              form.reset();
              setTimeout(() => {
                this.success = false;
              }, 5000);
            },
            (error) => {
              this.alertText = 'We were not able to process your submission at this time. Please try again.';
              this.err = true;
              this.alertType = 'err';
              console.log('FAILED...', error);
            },
          );
    }
  }
}
