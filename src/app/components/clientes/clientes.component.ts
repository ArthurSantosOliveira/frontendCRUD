import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ClienteService } from '../../Service/clientes.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  celular: string;
  email: string;
}

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, MenuComponent],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  exibirFormulario = false;
  editandoCliente: Cliente | null = null;
  clienteForm: FormGroup;

  constructor(private clienteService: ClienteService, private fb: FormBuilder) {
    this.clienteForm = this.fb.group({
      id: [''],
      nome: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      celular: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.carregarClientes();
  }

  //exibe clientes da api e atualiza a var clientes
  carregarClientes() {
    this.clienteService.listarClientes().subscribe(
      (data) => {
        this.clientes = data;
      },
      (erro) => {
        console.error('Erro ao carregar clientes:', erro);
      }
    );
  }

  //verifica se o forms e valido e qual opcao esta selecionada
  criarOuEditarCliente() {
    if (this.clienteForm.valid) {
      if (this.editandoCliente) {
        this.atualizarCliente();
      } else {
        this.criarCliente();
      }
    }
  }

  criarCliente() {
    this.clienteService.criarCliente(this.clienteForm.value).subscribe({
      next: () => {
        alert('Cliente cadastrado com sucesso!');
        this.resetarFormulario();
        this.carregarClientes();
      },
      error: (erro) => {
        console.error('Erro ao cadastrar cliente:', erro);
        alert('Erro ao cadastrar cliente.');
      }
    });
  }

  //define editandoCLiente como selecionado e exibe o forms e preenche com os dados
  editarCliente(cliente: Cliente) {
    this.editandoCliente = cliente;
    this.exibirFormulario = true;
    this.clienteForm.patchValue(cliente);
  }

  atualizarCliente() {
    if (this.editandoCliente) {
      this.clienteService.atualizarCliente(this.editandoCliente.id.toString(), this.clienteForm.value).subscribe({
        next: () => {
          alert('Cliente atualizado com sucesso!');
          this.resetarFormulario();
          this.carregarClientes();
        },
        error: (erro) => {
          console.error('Erro ao atualizar cliente:', erro);
          alert('Erro ao atualizar cliente.');
        }
      });
    }
  }

  excluirCliente(id: number) {
    if (confirm('Tem certeza que deseja excluir este cliente?')) {
      this.clienteService.excluirCliente(id).subscribe({
        next: () => {
          alert('Cliente excluído com sucesso!');
          this.clientes = this.clientes.filter(cliente => cliente.id !== id);
        },
        error: (erro) => {
          console.error('Erro ao excluir cliente:', erro);
          alert('Erro ao excluir cliente. Tente novamente.');
        }
      });
    }
  }

  //reseta o forms
  alterarExibicao(opcao: string) {
    this.exibirFormulario = (opcao === 'cadastrar' || opcao === 'editar');
    if (!this.exibirFormulario) {
      this.resetarFormulario();
    }
  }

  //reseta campos do forms
  resetarFormulario() {
    this.clienteForm.reset();
    this.editandoCliente = null;
    this.exibirFormulario = false;
  }
}
