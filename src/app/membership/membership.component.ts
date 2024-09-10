import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { EventsComponent } from '../events/events.component';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import { AlertComponent } from "../alert/alert.component";
import { Member } from '../member';
import { FirebaseService } from '../firebase.service';
import { Event as event } from '../event';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [CommonModule, EventsComponent, AlertComponent, ReactiveFormsModule],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.css'
})
export class MembershipComponent {

  constructor(private firebaseService: FirebaseService, private formBuilder: FormBuilder) {}

  @Input() scrollToEvents = false;
  @Input() signUpVisible = false;

  memForm = new FormGroup({
    url: new FormControl(''),
    membershipType: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    currentAddress: new FormControl(''),
    priorAddress: new FormControl(''),
    interest: new FormControl(''),
    family: new FormGroup({
      spouseFirstName: new FormControl(''),
      spouseEmail: new FormControl(''),
      spousePhone: new FormControl(''),
      children: new FormGroup({
        childName: new FormControl(''),
      }),
    }),
    committee: new FormControl('')
  });

  dynamicFormGroup!: FormGroup;

  alertText = '';
  alertType = '';
  err = false;
  success = false;
  familyChecked = false;
  // memForm: FormGroup;
  items: FormArray;

  requestFormVisible = false;

  ngOnInit() {
;
    // this.dynamicFormGroup = this.formBuilder.group({
    //   Spouse: new FormArray([this.createItem])
    // });
    // if (this.scrollToEvents) {
    //   let events = document.getElementById('events');
    //   events?.scrollIntoView({ behavior: 'smooth' });
    // }
    this.toggleSignup();
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
    console.log(this.memForm.value);
    let membership = this.memForm.value;
    e.preventDefault();
    let form = e.target as HTMLFormElement;
    console.log(form);
    if (this.memForm.value.membershipType) {
      const member = new Member(membership.firstName!, membership.lastName!, membership.email!, membership.currentAddress!, membership.membershipType!, membership.phone!)
      let memberType = membership.membershipType;
      this.firebaseService.addMember(member).then(() => {
        emailjs.sendForm("service_66ijhfa", "template_de4aoh4", form, {
            publicKey: 'pp0s7qlmsjt-_40XH',
        }).catch((err) => {
          console.log("Unable to send membership email: ", err);
        });
        this.success = true;
        this.alertText = 'Your submission has been received!';
        this.alertType = 'success';
        form.reset();
        // let url = '';
        // if (memberType === 'individual' && !this.err) {
        //   url = 'https://buy.stripe.com/bIYaEG5Ce1gs5Uc7ss';
        // } else {
        //   url = 'https://buy.stripe.com/eVa28ae8K0cociA146';
        // }
        // window.open(url);
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
