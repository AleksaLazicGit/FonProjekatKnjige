import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
  standalone: false,
})
export class LogInPage implements OnInit {
  isLoading = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async onLogin(logInForm: NgForm) {
    this.isLoading = true;
    console.log(logInForm);
    if (logInForm.valid) {
      this.authService.logIn(logInForm.value).subscribe({
        next: (resdata) => {
          console.log('prijava uspesna');
          console.log('resData');
          this.isLoading = false;
          this.router.navigateByUrl('/books/tabs/explore');
        },
        error: async (errRes) => {
          let message = 'Neispravni email ili password';
          console.log(errRes);
          const alert = await this.alertCtrl.create({
            header: 'Prijava neuspesna',
            message,
            buttons: ['OK'],
          });
          await alert.present();
          logInForm.reset();
        },
      });
    } else {
      console.error('Forma nije validna');
    }
  }
}
