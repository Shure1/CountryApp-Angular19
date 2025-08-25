import { Component, effect, input, linkedSignal, output, signal } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.css'
})
export class SearchInputComponent {
  public placeholder = input.required<string>()
  public initialValue = input<string>('')
  public value = output<string>()

  public inputValue = linkedSignal<string>(() => this.initialValue())

  constructor() {
    this.value.emit('value')
  }

  public debounceEffect = effect((oneCleanUp) => {
    const value = this.inputValue()
    console.log('pasa por el debounceEffect')

    const timeout = setTimeout(()=> {
      console.log('emite el valor')
      this.value.emit(value)
    }, 2000)

    oneCleanUp(()=> {
      console.log('pasa por el oneCleanUp')
      clearTimeout(timeout)
    })

  })

}
