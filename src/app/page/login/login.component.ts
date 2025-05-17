import { Component } from '@angular/core';
import { AuthTemplateComponent } from '../../template/auth/auth.component';
import { CustomInputAuthComponent } from '../../components/custom-input-auth/custom-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [AuthTemplateComponent, CustomInputAuthComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title: string = "Login"

  loginForm =  new FormGroup({
    email:     new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
  })

  controlWarn = {
    email: "Email inválido",
    password: "Senha é brigatória"
  }
}
