import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ClientesComponent} from "./components/clientes/clientes.component";
import {MenuComponent} from "./components/menu/menu.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClientesComponent, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-CRUD';
}
