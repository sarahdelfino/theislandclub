import { Injectable } from '@angular/core';
import { DropdownQuestion } from './question-dropdown';
import { QuestionBase } from './question-base';
import { TextboxQuestion } from './question-textbox';
import { RadioQuestion } from './question-radio';
import { of } from 'rxjs';


@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata
  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new RadioQuestion({
        key: 'mem_type',
        label: 'Membership Type',
        options: [
          { key: 'indv', value: 'Individual $250'},
          { key: 'fam', value: 'Family $350'}
        ],
        type: 'radio',
        order: 1,
      }),
      new TextboxQuestion({
        key: 'first_name',
        label: 'First Name',
        value: '',
        required: true,
        order: 2,
      }),
      new TextboxQuestion({
        key: 'last_name',
        label: 'Last Name',
        value: '',
        required: true,
        order: 3,
      }),
      new TextboxQuestion({
        key: 'email',
        label: 'Email',
        value: '',
        type: 'email',
        required: true,
        order: 4,
      }),
      new TextboxQuestion({
        key: 'spouse_first_name',
        label: 'Spouse\'s First Name',
        value: '',
        required: false,
        order: 5,
      }),
      new TextboxQuestion({
        key: 'spouse_last_name',
        label: 'Spouse\'s Last Name',
        value: '',
        required: false,
        order: 6,
      }),
      new TextboxQuestion({
        key: 'spouse_email',
        label: 'Spouse\'s Email',
        value: '',
        required: false,
        type: 'email',
        order: 7,
      }),
      new TextboxQuestion({
        key: 'phone',
        label: 'Phone',
        value: '',
        required: true,
        type: 'phone',
        order: 8,
      }),
      new TextboxQuestion({
        key: 'address',
        label: 'Address',
        value: '',
        required: true,
        order: 9,
      })
      // new DropdownQuestion({
      //   key: 'favoriteAnimal',
      //   label: 'Favorite Animal',
      //   options: [
      //     {key: 'cat', value: 'Cat'},
      //     {key: 'dog', value: 'Dog'},
      //     {key: 'horse', value: 'Horse'},
      //     {key: 'capybara', value: 'Capybara'},
      //   ],
      //   order: 3,
      // }),
      // new TextboxQuestion({
      //   key: 'firstName',
      //   label: 'First name',
      //   value: '',
      //   required: true,
      //   order: 1,
      // }),
      // new TextboxQuestion({
      //   key: 'lastName',
      //   label: 'Last name',
      //   value: '',
      //   required: true,
      //   order: 2,
      // }),
      // new TextboxQuestion({
      //   key: 'emailAddress',
      //   label: 'Email',
      //   type: 'email',
      //   order: 3,
      // }),
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
}