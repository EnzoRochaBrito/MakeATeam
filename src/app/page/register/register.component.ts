import { Component } from '@angular/core';
import { AuthTemplateComponent } from '../../template/auth/auth.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomInputAuthComponent } from '../../components/custom-input-auth/custom-input.component';
import { CommonModule } from '@angular/common';
import { EqualPasswordValidator } from '../../validators/equal-password.validator';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RegisterDTO } from '../../utils/dto/auth.dto';
import { take } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [AuthTemplateComponent, ReactiveFormsModule, CustomInputAuthComponent, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  title: string = 'Registrar';

  constructor(private authService: AuthService, private router: Router){}

  registerForm = new FormGroup({
    username:    new FormControl('', [Validators.minLength(5), Validators.maxLength(30), Validators.required]),
    email:       new FormControl('', [Validators.email, Validators.required]),
    passwordOne: new FormControl('', [Validators.minLength(6), Validators.required]),
    passwordTwo: new FormControl('', [Validators.required])
  },
    [EqualPasswordValidator.equalPassword]
  )

  controlWarn = {
    username: "Insira entre 5 a 30 caractéres.",
    email: "Insira um email válido.",
    passwordOne: "Insira no mínimo 6 caracteres.",
    passwordTwo: "Senhas não coincidem"
  }

  registration(){

    const user: RegisterDTO = {
      name:     this.registerForm.controls.username.value as string,
      email:    this.registerForm.controls.email.value as string,
      password: this.registerForm.controls.passwordOne.value as string,
    }
    
    this.authService.register(user)
    .pipe(take(1))
    .subscribe(
      {
        next: (cred) => { this.router.navigate(['/open']); },
        error: (err) => { console.log("Erro ao registrar, ", err); }
      }
    )
  }
}
