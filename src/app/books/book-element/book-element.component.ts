import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-book-element',
  templateUrl: './book-element.component.html',
  styleUrls: ['./book-element.component.scss'],
  standalone: false,
})
export class BookElementComponent implements OnInit {
  @Input() book: Book = {
    id: 'q3',
    author: 'Jane Austen',
    title: 'Pride and Prejudice',
    genre: 'romance',
    userId: 'xxx',
    imageUrl:
      'https://play-lh.googleusercontent.com/RQF-CqRfonKGB6tI0nH7B_fc83AFbyiyUIuLaJNm46u2JDGKo3wdyAkBsnPZEI7dkHzEJAri5fth=s256-rw',
  };
  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {}

  openAlert() {
    this.alertCtrl
      .create({
        header: 'Saving book',
        message: 'Are you sure you want to save this book?',
        buttons: [
          {
            text: 'Save',
            handler: () => {
              console.log('Save it!');
            },
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Do not save it!');
            },
          },
        ],
      })
      .then((alert) => {
        alert.present();
      });
  }
}
