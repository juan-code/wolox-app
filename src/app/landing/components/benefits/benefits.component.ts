import { Component, OnInit } from '@angular/core';

interface ListBenefits {
  nameComponent: string;
  text: string;
}

@Component({
  selector: 'app-benefits',
  templateUrl: './benefits.component.html',
  styleUrls: ['./benefits.component.scss']
})
export class BenefitsComponent implements OnInit {
  public readonly listIconsNamesComponents:ListBenefits[] = [
    {
      nameComponent: 'TimeComponent',
      text: 'FLEXIBLE_SCHEDULE'
    },
    {
      nameComponent: 'HomeOfficeComponent',
      text: 'HOME_OFFICE'
    },
    {
      nameComponent: 'WorkshopComponent',
      text: 'CAPACITIES_WORKSHOPS'
    },
    {
      nameComponent: 'SnacksComponent',
      text: 'SNACKS'
    },
    {
      nameComponent: 'RemoteComponent',
      text: 'REMOTE_WEEK'
    },
    {
      nameComponent: 'BrainComponent',
      text: 'CURRENTLY'
    },
  ]
  constructor() { }

  ngOnInit(): void {
  }

  public getPath(pathName:string): string {
    return `BENEFITS.${pathName}`;
  }

}
