import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brain',
  templateUrl: './brain.component.svg',
  styleUrls: ['./brain.component.scss']
})
export class BrainComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public HolaMundo():string {
    return ''
  }

}
