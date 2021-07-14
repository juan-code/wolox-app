import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '@app/sign/services';
import { ALPHA_NUMERIC_REGEXP, EMAIL_REGEXP, ONLY_NUMBER_REGEXP } from '@shared/constants';
import { CapitalizePipe } from '@shared/pipes';

import { mustMatch } from '@sign/helpers/mustMatch';

import { getMessage } from '@sign/messages';

interface CountryItem {
  name: string;
  nativeName: string;
  flag: string;
  index: number;
  capital: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../shared.style.scss']
})
export class SignUpComponent implements OnInit {
  public province:string = '';
  public formSignup!:FormGroup;
  public isLogginIn:boolean = false;
  public readonly maxLengthPhone:number = 10;
  public readonly maxLengthName:number = 30;
  constructor(
    private readonly formbuilder: FormBuilder,
    private readonly capitalize: CapitalizePipe,
    private readonly sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    const validatorName = Validators.compose([
      Validators.required,
      Validators.maxLength(this.maxLengthName),
    ]);
    
    this.formSignup = this.formbuilder.group({
      name: this.formbuilder.control('', validatorName), 
      last_name: this.formbuilder.control('', validatorName),
      country: this.formbuilder.control('', Validators.required),
      province: this.formbuilder.control(''),
      email: this.formbuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern(EMAIL_REGEXP),
      ])),
      phone: this.formbuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern(ONLY_NUMBER_REGEXP),
        Validators.maxLength(this.maxLengthPhone),
      ])),
      password: this.formbuilder.control('', Validators.compose([
        Validators.required,
        Validators.pattern(ALPHA_NUMERIC_REGEXP)
      ])),
      confirmation: this.formbuilder.control('', Validators.required),
    }, {
      validator: mustMatch('password', 'confirmation')
    })
  }
  public onSubmit(form:FormGroup) {
    if(form.valid) {
      const { confirmation, ...body } = form.value;
      this.isLogginIn = true;
      this.sessionService.signUp(body).subscribe(() => {
        this.isLogginIn = false;
      })
    }
  }

  public changeCountry(country?:CountryItem) {
    this.formSignup.get('province')?.setValue(country?.capital || '');
  }

  public showError(key:string): boolean {
    const control = this.formSignup.get(key);
    const isValid:boolean = Boolean(control?.invalid && (control?.dirty || control?.touched))
    return isValid
  }

  public getMessage(key:string): string {
    const control:AbstractControl | null = this.formSignup.get(key)
    return getMessage(key, control);
  }

  public getValue(txt:string = '') {
    return { value:this.capitalize.transform(txt) }
  }
}
