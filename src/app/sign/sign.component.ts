import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent {
  public isShowingLogin:boolean = true

  public toggleLogin(): void {
    this.isShowingLogin = !this.isShowingLogin
  }
}
