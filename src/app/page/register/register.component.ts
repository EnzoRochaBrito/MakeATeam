import { Component } from '@angular/core';
import { AuthTemplateComponent } from '../../template/auth/auth.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [AuthTemplateComponent, ReactiveFormsModule, CustomInputComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title: string = 'Registrar';

  registerForm = new FormGroup({
    username:  new FormControl('', [Validators.minLength(5), Validators.maxLength(30), Validators.required]),
    email:     new FormControl('', [Validators.email, Validators.required]),
    passwordOne: new FormControl('', [Validators.minLength(6), Validators.required]),
    passwordTwo: new FormControl('', [Validators.minLength(6), Validators.required])
  })

  controlWarn = {
    username: "Insira entre 5 a 30 caractéres.",
    email: "Insira um email válido.",
    passwordOne: "Insira no mínimo 6 caracteres.",
    passwordTwo: "Senhas não coincidem"
  }
}
