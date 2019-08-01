import { Component, Input, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormHelper } from '@notenic/helpers/form.helper';

@Component({
  selector: 'note-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor() {
  }

  @Input() name: string;
  @Input() showLabel = true;
  @Input() placeholder: string;
  @Input() type: string;
  @Input() bottomText: string = null;
  @Input() formCtrl: FormControl;
  @Input() required = false;
  validationError: string = null;
  showPassword = false;

  ngOnInit(): void {
    this.formCtrl.valueChanges.subscribe(() => this.validateForm());
  }

  validateForm(): void {
    const errors = FormHelper.generateErrorMessagesFromErrors(this.name, this.formCtrl.errors);
    this.validationError = errors.length > 0 ? errors[0] : null;
  }

  onToggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }


}
