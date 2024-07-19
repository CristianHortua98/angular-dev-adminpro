import { Component } from '@angular/core';

@Component({
  selector: 'app-nopagesfound',
  templateUrl: './nopagesfound.component.html',
  styleUrl: './nopagesfound.component.css'
})
export class NopagesfoundComponent {

  year = new Date().getFullYear();

}
