import { Component } from '@angular/core';
import { AuthTemplateComponent } from '../../template/auth/auth.component';
import { CustomInputComponent } from '../../components/custom-input/custom-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [AuthTemplateComponent, CustomInputComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title: string = "Login"

  loginForm =  new FormGroup({
    email:     new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
  })
}
