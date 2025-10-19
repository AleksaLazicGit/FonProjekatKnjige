import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.scss'],
  standalone: false,
})
export class BookModalComponent implements OnInit {
  @ViewChild('f', { static: true }) form!: NgForm;
  @Input() title!: string;
  @Input() mode!: string;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  onAddBook() {
    if (!this.form.valid) {
      return;
    }

    this.modalCtrl.dismiss(
      {
        bookData: {
          author: this.form.value['author'],
          title: this.form.value['title'],
          genre: this.form.value['genre'],
        },
      },
      'confirm'
    );
  }
}
