import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

import { CapitalizePipe } from '@shared/pipes';

import { EMAIL_REGEXP, POKEMON_ROUTES } from '@shared/constants';
import { getMessage } from '@sign/messages';
import { SessionService } from '@app/sign/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss', '../shared.style.scss']
})
export class SignInComponent implements OnInit {

  public isLoggin:boolean = false;
  public formSignin!:FormGroup;
  constructor(
    private readonly fb:FormBuilder,
    private readonly capitalize: CapitalizePipe,
    private readonly sessionService: SessionService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.formSignin = this.fb.group({
      email: this.fb.control('', Validators.compose([
        Validators.required,
        Validators.pattern(EMAIL_REGEXP)
      ])),
      password: this.fb.control('', Validators.required),
    })
  }

  public onSubmit(form:FormGroup) {
    if(form.valid) {
      this.isLoggin = true;
      this.sessionService.signIn(form.value).subscribe(() => {
        this.isLoggin = false;
        this.router.navigateByUrl(`/${POKEMON_ROUTES.main}`);
      })
    }
  }

  public showError(key:string): boolean {
    const control = this.formSignin.get(key);
    const isValid:boolean = !!(control?.invalid && control?.errors && (control?.dirty || control.touched))
    return isValid
  }

  public getMessage(key:string): string {
    const control: AbstractControl | null = this.formSignin.get(key)
    return getMessage(key, control);
  }

  public getValue(txt:string = '') {
    return { value:this.capitalize.transform(txt) }
  }
}
