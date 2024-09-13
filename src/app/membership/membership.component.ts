import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EventsComponent } from '../events/events.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { AlertComponent } from "../alert/alert.component";
import { Member } from '../member';
import { FirebaseService } from '../firebase.service';
import { Event as event } from '../event';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, EventsComponent, AlertComponent, ReactiveFormsModule],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent {

  constructor(private firebaseService: FirebaseService, private formBuilder: FormBuilder) {
    this.memForm = new FormGroup({
      submitDate: new FormControl(Date.now(), Validators.required),
      membershipType: new FormControl('', [Validators.required]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required]),
      currentAddress: new FormControl('', [Validators.required]),
      priorAddress: new FormControl(''),
      interest: new FormControl('', [Validators.required]),
      family: new FormGroup({
        url: new FormControl(''),
        spouseFirstName: new FormControl(''),
        spouseEmail: new FormControl('', [Validators.email]),
        spousePhone: new FormControl(''),
        children: this.formBuilder.array([]),
      }),
      committee: new FormControl('', [Validators.required])
    });
    
    this.eventForm = new FormGroup({
      submitDate: new FormControl(Date.now(), Validators.required),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      eventDate: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      eventName: new FormControl('', [Validators.required]),
      eventDescription: new FormControl('', [Validators.required, Validators.minLength(50)]),
    })
  }

  @Input() signUpVisible = false;

  dynamicFormGroup!: FormGroup;

  alertText = '';
  alertType = '';
  err = false;
  success = false;
  familyChecked = false;
  memForm: FormGroup;
  eventForm: FormGroup;

  requestFormVisible = false;

  ngOnInit() {
    this.toggleSignup();
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
    this.signUpVisible = !this.signUpVisible;
  }

  toggleRequest() {
    this.signUpVisible = false;
    this.requestFormVisible = !this.requestFormVisible;
  }

  submit(e: Event) {
    let membership = this.memForm.value;
    e.preventDefault();
    let form = e.target as HTMLFormElement;
    if (this.memForm.value.membershipType) {
      const member = new Member(membership.firstName!, membership.lastName!, membership.email!, membership.currentAddress!, membership.membershipType!, membership.phone!)
      this.firebaseService.addMember(member).then(() => {
        emailjs.sendForm("service_66ijhfa", "template_de4aoh4", form, {
            publicKey: 'pp0s7qlmsjt-_40XH',
        }).catch((err) => {
          console.log("Unable to send membership email: ", err);
          this.alertText = 'We were not able to process your submission at this time. Please try again.';
          this.err = true;
          this.alertType = 'err';
        });
        this.success = true;
        this.alertText = 'Your submission has been received!';
        this.alertType = 'success';
        form.reset();
        setTimeout(() => {
          this.success = false;
        }, 2000);
      }).catch((err) => {
        this.alertText = 'We were not able to process your submission at this time. Please try again.';
          this.err = true;
          this.alertType = 'err';
          console.log('FAILED...', err);
      });
    } else {
      const submittedEvent = new event(Date.now().toString(), form['event_name'].value, form['event_date'].value, form['event_start'].value, form['event_end'].value, form['event_description'].value, form['first_name'].value + ' ' + form['last_name'].value, form['email'].value, 'pending approval', form['phone'].value);
      this.firebaseService.addEvent(submittedEvent);
      emailjs
        .sendForm('service_66ijhfa', 'template_jfj2cqe', form, {
          publicKey: 'pp0s7qlmsjt-_40XH',
        })
        .then(
          () => {
            this.success = true;
            this.alertText = 'Your submission has been received!';
            this.alertType = 'success';
            form.reset();
            setTimeout(() => {
              this.success = false;
            }, 2000);
          },
          (error) => {
            this.alertText = 'We were not able to process your submission at this time. Please try again.';
            this.err = true;
            this.alertType = 'err';
            console.log('FAILED...', error);
          },
        );
    }
    let alert = document.getElementById('buttons');
    alert?.scrollIntoView({ behavior: 'smooth' });
  }
}
