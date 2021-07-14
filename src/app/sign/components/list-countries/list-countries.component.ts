import { Component, OnInit, ViewChild, ElementRef, HostListener, forwardRef, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';

import { Country, CountryService } from '@sign/services';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FilterListPipe } from '@app/shared/pipes';

interface CountryItem {
  name: string;
  nativeName: string;
  flag: string;
  index: number;
  capital: string;
}

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ListCountriesComponent),
      multi: true   
    },
  ],
})
export class ListCountriesComponent implements OnInit, ControlValueAccessor {
  public listCountry: CountryItem[] = [];
  public countryName: string = '';
  public showList: boolean = false;
  private firtsTime: boolean = true;
  @Output('changeCountry') changeContry:EventEmitter<CountryItem> = new EventEmitter<CountryItem>();
  @ViewChild('search', { static:true }) public inputSerach!:ElementRef;
  @ViewChild('list', { static:false }) public listContries!:ElementRef;
  constructor(
    private readonly countryService:CountryService,
    private readonly pipeFilter: FilterListPipe,
  ) {}

  ngOnInit() {
    this.getListCountry();
  }

  public onChanged: any = () => {}
  public onTouched: any = () => {}
  
  public writeValue(countryName:string = ''): void {
    this.countryName = countryName;
  }

  public registerOnChange(fn:any) {
    this.onChanged = fn
  }

  public registerOnTouched(fn:any) {
    this.onTouched = fn
  }

  public trackByFn(_:number, item:CountryItem): CountryItem {
    return item
  }

  private getListCountry() {
    this.countryService.getListCountry()
    .pipe(
      map(countries => countries.map((country:Country, index:number) => {
        const result:CountryItem = {
          name: country.name,
          nativeName: country.nativeName,
          flag: country.flag,
          capital: country.capital,
          index,
        }
        return result
      }))
    )
    .subscribe((countries:CountryItem[]) => {
      this.listCountry = countries;
    })
  }

  public searchCountry(search:string): void {
    this.showList = search?.length > 0;
    if(!this.showList) {
      this.onChanged('');
      this.onTouched();
      this.firtsTime = false;
      this.changeContry.emit();
    }
  }

  public selectCountry(country:CountryItem) {
    if(country.name !== this.countryName) {
      this.countryName = country.name;
      this.showList = false;
      this.onChanged(this.countryName);
      this.changeContry.emit(country);
    }
  }

  public filter(country:CountryItem, criteria:string = ''):boolean {
    const criteriaSearch:string = criteria?.toLowerCase() || '';
    const name = country?.name?.toLowerCase()
    const nativeName = country?.nativeName?.toLowerCase()
    return name?.includes(criteriaSearch) || nativeName?.includes(criteriaSearch);
  }

  @HostListener('document:click', ['$event'])
  public onBlurEventListener(e:Event) {
    const el:HTMLInputElement = this.inputSerach?.nativeElement;
    if(e.target !== el && e.target !== this.listContries?.nativeElement){
      this.showList = false;
      const fn: (country: CountryItem, criteria?: string) => boolean = (country:CountryItem, criteria:string = ''): boolean => {
        const criteriaSearch:string = criteria?.toLowerCase() || '';
        const name = country?.name?.toLowerCase()
        return name === criteriaSearch
      }
      const listCountries:CountryItem[] = this.pipeFilter.transform(this.listCountry, fn, el.value);
      if(listCountries.length === 0 && el.value.length > 0) {
        this.onChanged('');
        this.onTouched();
        this.changeContry.emit();
        this.countryName = '';
      }
    }
  }
}
