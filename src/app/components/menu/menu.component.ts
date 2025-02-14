import {Component, EventEmitter, Output} from '@angular/core';
import { MenubarModule} from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Output() opcaoSelecionada = new EventEmitter<string>();

  selecionarOpcao(opcao: string) {
    this.opcaoSelecionada.emit(opcao);
  }
}
