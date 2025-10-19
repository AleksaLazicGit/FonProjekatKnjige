import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  constructor(private authService: AuthService) {
    this.registerForm = new FormGroup({
      name: new FormControl('Aleksa', Validators.required),
      surname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  ngOnInit() {}

  onRegister() {
    console.log(this.registerForm);
    this.authService.register(this.registerForm.value).subscribe((resData) => {
      console.log('Registracija uspela');
      console.log(resData);
    });
  }
}
