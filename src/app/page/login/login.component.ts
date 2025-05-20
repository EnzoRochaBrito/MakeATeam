import { Component } from '@angular/core';
import { AuthTemplateComponent } from '../../template/auth/auth.component';
import { CustomInputAuthComponent } from '../../components/custom-input-auth/custom-input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoginDTO } from '../../utils/dto/auth.dto';
import { take } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [AuthTemplateComponent, CustomInputAuthComponent, ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title: string = "Login"

  constructor(private authService: AuthService, private router: Router) {}

  loginForm =  new FormGroup({
    email:     new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.minLength(6), Validators.required]),
  })

  controlWarn = {
    email: "Email inválido",
    password: "Senha é brigatória"
  }

  login(){
    const userLogin: LoginDTO = {
      email: this.loginForm.controls.email.value as string,
      password: this.loginForm.controls.password.value as string
    }

    this.authService.login(userLogin)
    .pipe(take(1))
    .subscribe({
      next: (cred) => { this.router.navigate(['/open']); },
      error: (err) => { console.log("Erro ao logar, ", err); }
    })
  }
}
