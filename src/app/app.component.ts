import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EnderecoService } from './services/endereco.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Endereco } from './models/endereço';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private enderecoService: EnderecoService,
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      nomeCompleto: [''],
      dataNascimento: [''],
      cpf: [''],
      email: [''],
      telefone: [''],
      cep: [''],
      rua: [''],
      numero: [''],
      complemento: [''],
      bairro: [''],
      cidade: [''],
      estado: ['']
    });
  }

  fetchAddressData(){
    const cepControl = this.userForm.get('cep');
    if(cepControl?.valid) {
      this.enderecoService.getEndereco(cepControl.value).then((endereco: Endereco) => {
        this.userForm.get("rua")?.setValue(endereco.logradouro);
        this.userForm.get("bairro")?.setValue(endereco.bairro);
        this.userForm.get("cidade")?.setValue(endereco.cidade);
        this.userForm.get("estado")?.setValue(endereco.uf);
      }).catch(() => {
        alert("Erro na busca dos dados do CEP");
      })
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userForm.reset();
      alert("Formulário enviado com sucesso!");
    } else {
      alert("Formulário inválido");
    }
  }
}
