import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  public placeholder = input.required<string>()
  public value = output<string>()

  constructor() {
    this.value.emit('value')
  }

}
